import { resolve } from 'node:path';
import { Global, Inject, Module, type OnApplicationShutdown } from '@nestjs/common';
import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';
import pg from 'pg';
import * as schema from './schema.js';

// Injection tokens: the names other classes ask for in their constructors.
export const DB = Symbol('DB');
const DB_CLIENT = Symbol('DB_CLIENT');

// The database type the rest of the app sees. Both drivers below produce one.
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;
type Client = pg.Pool | PGlite;

const migrationsFolder = resolve(process.cwd(), 'drizzle');

// With DATABASE_URL set (production), connect to a real PostgreSQL server.
// Without it (local dev and tests), run PGlite: PostgreSQL compiled to WebAssembly,
// running inside this Node process, so nothing has to be installed.
// Either way, apply any pending migrations before the app starts taking requests.
async function connect(): Promise<{ client: Client; db: Db }> {
  const url = process.env.DATABASE_URL;
  if (url) {
    const client = new pg.Pool({ connectionString: url, max: 5 });
    const db = drizzlePg(client, { schema });
    await migratePg(db, { migrationsFolder });
    return { client, db };
  }
  const client = new PGlite(process.env.PGLITE_DIR ?? './.pglite');
  const db = drizzlePglite(client, { schema });
  await migratePglite(db, { migrationsFolder });
  return { client, db };
}

@Global()
@Module({
  providers: [
    { provide: 'DB_CONNECTION', useFactory: connect },
    { provide: DB_CLIENT, useFactory: (c: { client: Client }) => c.client, inject: ['DB_CONNECTION'] },
    { provide: DB, useFactory: (c: { db: Db }) => c.db, inject: ['DB_CONNECTION'] },
  ],
  exports: [DB],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(@Inject(DB_CLIENT) private readonly client: Client) {}

  // Close the connection when the app stops, so tests and restarts exit cleanly.
  async onApplicationShutdown() {
    if (this.client instanceof PGlite) await this.client.close();
    else await this.client.end();
  }
}
