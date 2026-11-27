import { Injectable, Logger } from '@nestjs/common';

type Message = { name: string; email: string; message: string };

// Emails me when a real message arrives, through Resend's HTTP API.
// Without RESEND_API_KEY and CONTACT_NOTIFY_TO (e.g. local dev, tests) it does nothing.
// It never throws: the message is already saved, so a failed email must not fail the request.
@Injectable()
export class ContactNotifier {
  private readonly logger = new Logger(ContactNotifier.name);

  async notify(msg: Message): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_NOTIFY_TO;
    if (!apiKey || !to) return;

    // Keep the visitor's name on one line so it can't break the subject header.
    const name = msg.name.replace(/[\r\n]+/g, ' ');

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Resend's shared test sender; it may only send to the Resend account's own address.
          from: process.env.CONTACT_NOTIFY_FROM ?? 'Portfolio <onboarding@resend.dev>',
          to: [to],
          reply_to: msg.email, // pressing Reply answers the visitor directly
          subject: `Portfolio message from ${name}`,
          text: `${msg.message}\n\n— ${name} <${msg.email}>`,
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) this.logger.error(`Resend answered ${res.status}: ${await res.text()}`);
    } catch (error) {
      this.logger.error(`Email alert failed: ${String(error)}`);
    }
  }
}
