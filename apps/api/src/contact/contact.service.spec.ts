import { ContactService, MIN_FILL_MS } from './contact.service.js';
import type { Db } from '../db/database.module.js';

// A stand-in database that only records whether insert() was called.
function fakeDb() {
  const values = vi.fn().mockResolvedValue(undefined);
  const insert = vi.fn().mockReturnValue({ values });
  return { db: { insert } as unknown as Db, values };
}

const now = 1_000_000;
const base = { name: 'Ada', email: 'ada@example.com', message: 'Hello there, nice site.' };

describe('ContactService', () => {
  it('stores a message filled in at human speed', async () => {
    const { db, values } = fakeDb();
    const stored = await new ContactService(db).submit({ ...base, startedAt: now - MIN_FILL_MS }, now);
    expect(stored).toBe(true);
    expect(values).toHaveBeenCalledWith(base);
  });

  it('drops a message sent faster than a person could type it', async () => {
    const { db, values } = fakeDb();
    const stored = await new ContactService(db).submit({ ...base, startedAt: now - 500 }, now);
    expect(stored).toBe(false);
    expect(values).not.toHaveBeenCalled();
  });

  it('drops a message with the hidden field filled in', async () => {
    const { db, values } = fakeDb();
    const stored = await new ContactService(db).submit(
      { ...base, website: 'spam', startedAt: now - 60_000 },
      now,
    );
    expect(stored).toBe(false);
    expect(values).not.toHaveBeenCalled();
  });
});
