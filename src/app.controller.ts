import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor() { }

  @ApiExcludeEndpoint()
  @Get()
  async redirect(@Res() resposta: Response) {
    console.log('Redirecionando para /swagger');
    return resposta.redirect('/swagger');
  }

}
