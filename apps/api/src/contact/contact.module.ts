import { Module } from '@nestjs/common';
import { ContactNotifier } from './contact-notifier.js';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

// Everything for the contact feature, grouped. AppModule imports this.
@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactNotifier],
})
export class ContactModule {}
