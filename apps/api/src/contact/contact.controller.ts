import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle, minutes } from '@nestjs/throttler';
import { contactSchema, type ContactDto } from './contact.schema.js';
import { ContactService } from './contact.service.js';

@Controller('contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  // POST /contact. Stricter limit than the rest of the API: 5 messages per IP per 10 minutes.
  @Post()
  @HttpCode(200)
  @Throttle({ default: { limit: 5, ttl: minutes(10) } })
  async create(@Body({ schema: contactSchema }) dto: ContactDto) {
    // Spam gets the same answer as a real message, so bots learn nothing from it.
    await this.contact.submit(dto);
    return { ok: true };
  }
}
