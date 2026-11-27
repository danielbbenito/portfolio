import { Inject, Injectable, Logger } from '@nestjs/common';
import { DB, type Db } from '../db/database.module.js';
import { contactMessages } from '../db/schema.js';
import type { ContactDto } from './contact.schema.js';

// A person needs a few seconds to type a message; most bots submit instantly.
export const MIN_FILL_MS = 3000;

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(@Inject(DB) private readonly db: Db) {}

  // Returns true if the message was stored, false if it was dropped as spam.
  async submit(dto: ContactDto, now = Date.now()): Promise<boolean> {
    if (this.looksLikeSpam(dto, now)) {
      this.logger.warn('Dropped a contact message that looked like spam');
      return false;
    }
    await this.db.insert(contactMessages).values({
      name: dto.name,
      email: dto.email,
      message: dto.message,
    });
    return true;
  }

  private looksLikeSpam(dto: ContactDto, now: number): boolean {
    const filledHoneypot = Boolean(dto.website?.trim());
    const tooFast = now - dto.startedAt < MIN_FILL_MS;
    return filledHoneypot || tooFast;
  }
}
