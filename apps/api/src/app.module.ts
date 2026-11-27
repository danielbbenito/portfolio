import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule, minutes } from '@nestjs/throttler';
import { ContactModule } from './contact/contact.module.js';
import { DatabaseModule } from './db/database.module.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [
    // Rate limiting for every route: 60 requests per IP per minute.
    // Routes can set a stricter limit with @Throttle (POST /contact does).
    ThrottlerModule.forRoot({ throttlers: [{ ttl: minutes(1), limit: 60 }] }),
    DatabaseModule,
    ContactModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
