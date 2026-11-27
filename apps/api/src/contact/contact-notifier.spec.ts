import { ContactNotifier } from './contact-notifier.js';

const msg = { name: 'Ada\nLovelace', email: 'ada@example.com', message: 'Hello there, nice site.' };

describe('ContactNotifier', () => {
  const env = { ...process.env };
  afterEach(() => {
    process.env = { ...env };
    vi.unstubAllGlobals();
  });

  it('does nothing when it is not configured', async () => {
    delete process.env.RESEND_API_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await new ContactNotifier().notify(msg);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends one email to me, with reply-to set to the visitor', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_NOTIFY_TO = 'me@example.com';
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await new ContactNotifier().notify(msg);

    const [url, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init.body);
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer test-key');
    expect(body.to).toEqual(['me@example.com']);
    expect(body.reply_to).toBe('ada@example.com');
    expect(body.subject).toBe('Portfolio message from Ada Lovelace'); // newline removed
  });

  it('never throws, even when the email service is down', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_NOTIFY_TO = 'me@example.com';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    await expect(new ContactNotifier().notify(msg)).resolves.toBeUndefined();
  });
});
