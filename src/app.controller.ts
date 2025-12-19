import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor() { }

  @ApiExcludeEndpoint()
    @Get()
    redirect(@Res() res: Response) {
        return res.redirect('/swagger');
    }
}
