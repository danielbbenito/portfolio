import { ContactService, MIN_FILL_MS } from './contact.service.js';
import type { ContactNotifier } from './contact-notifier.js';
import type { Db } from '../db/database.module.js';

// Stand-ins for the database and the email alert, so the test only checks ContactService's own rules.
function fakes() {
  const values = vi.fn().mockResolvedValue(undefined);
  const insert = vi.fn().mockReturnValue({ values });
  const notify = vi.fn().mockResolvedValue(undefined);
  const service = new ContactService({ insert } as unknown as Db, { notify } as unknown as ContactNotifier);
  return { service, values, notify };
}

const now = 1_000_000;
const base = { name: 'Ada', email: 'ada@example.com', message: 'Hello there, nice site.' };

describe('ContactService', () => {
  it('stores a message filled in at human speed and sends an alert', async () => {
    const { service, values, notify } = fakes();
    const stored = await service.submit({ ...base, startedAt: now - MIN_FILL_MS }, now);
    expect(stored).toBe(true);
    expect(values).toHaveBeenCalledWith(base);
    expect(notify).toHaveBeenCalledWith(base);
  });

  it('drops a message sent faster than a person could type it', async () => {
    const { service, values, notify } = fakes();
    const stored = await service.submit({ ...base, startedAt: now - 500 }, now);
    expect(stored).toBe(false);
    expect(values).not.toHaveBeenCalled();
    expect(notify).not.toHaveBeenCalled();
  });

  it('drops a message with the hidden field filled in', async () => {
    const { service, values, notify } = fakes();
    const stored = await service.submit({ ...base, website: 'spam', startedAt: now - 60_000 }, now);
    expect(stored).toBe(false);
    expect(values).not.toHaveBeenCalled();
    expect(notify).not.toHaveBeenCalled();
  });
});
