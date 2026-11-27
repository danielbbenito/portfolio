import { Controller, Get } from '@nestjs/common';

// GET /health: lets the hosting platform (and me) check the API is up.
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { ok: true };
  }
}
