import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() { }

  @ApiExcludeEndpoint()
  @Get()
  async root() {
    return { message: 'API Garçon-Delivery', documentation: '/swagger' };
  }

}
