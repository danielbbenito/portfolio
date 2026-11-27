import { Test } from '@nestjs/testing';
import { type INestApplication, StandardSchemaValidationPipe } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { DB, type Db } from './../src/db/database.module.js';
import { contactMessages } from './../src/db/schema.js';

// Each test gets a fresh app with an empty in-memory PGlite database.
process.env.PGLITE_DIR = 'memory://';
delete process.env.DATABASE_URL;

const valid = () => ({
  name: 'Ada',
  email: 'ada@example.com',
  message: 'Hello, I saw your portfolio.',
  startedAt: Date.now() - 10_000,
});

describe('POST /contact (e2e)', () => {
  let app: INestApplication<App>;
  let db: Db;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new StandardSchemaValidationPipe());
    await app.init();
    db = app.get(DB);
  });

  afterEach(async () => {
    await app.close();
  });

  it('stores a valid message', async () => {
    await request(app.getHttpServer()).post('/contact').send(valid()).expect(200, { ok: true });
    const rows = await db.select().from(contactMessages);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ name: 'Ada', email: 'ada@example.com' });
  });

  it('rejects an invalid body with 400 and the reasons', async () => {
    const res = await request(app.getHttpServer())
      .post('/contact')
      .send({ ...valid(), email: 'not-an-email', message: 'hi' })
      .expect(400);
    expect(res.body.message.join(' ')).toContain('email');
    expect(res.body.message.join(' ')).toContain('message');
  });

  it('answers ok but stores nothing when the honeypot is filled', async () => {
    await request(app.getHttpServer())
      .post('/contact')
      .send({ ...valid(), website: 'http://spam.example' })
      .expect(200, { ok: true });
    expect(await db.select().from(contactMessages)).toHaveLength(0);
  });

  it('answers ok but stores nothing when the form was sent too fast', async () => {
    await request(app.getHttpServer())
      .post('/contact')
      .send({ ...valid(), startedAt: Date.now() })
      .expect(200, { ok: true });
    expect(await db.select().from(contactMessages)).toHaveLength(0);
  });

  it('rate-limits after 5 messages from one address', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer()).post('/contact').send(valid()).expect(200);
    }
    await request(app.getHttpServer()).post('/contact').send(valid()).expect(429);
  });

  it('reports health', () => {
    return request(app.getHttpServer()).get('/health').expect(200, { ok: true });
  });
});
