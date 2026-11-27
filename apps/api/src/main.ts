import { existsSync } from 'node:fs';
import { StandardSchemaValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';

// Local settings live in apps/api/.env (git-ignored). The host sets real ones in its dashboard.
if (existsSync('.env')) process.loadEnvFile('.env');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validate request bodies against their Zod schema (see @Body({ schema })).
  app.useGlobalPipes(new StandardSchemaValidationPipe());

  // Only the portfolio site may call this API from a browser.
  const origins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000').split(',').map((o) => o.trim());
  app.enableCors({ origin: origins, methods: ['GET', 'POST'] });

  // Behind the host's proxy, every request seems to come from the proxy.
  // Trusting that many hops makes req.ip the visitor's real address, which rate limiting needs.
  const proxyHops = Number(process.env.TRUST_PROXY_HOPS ?? 0);
  if (proxyHops > 0) app.set('trust proxy', proxyHops);

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
