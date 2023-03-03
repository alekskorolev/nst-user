import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { BasicService } from './basic.service';
import { CreateCredentialDto } from './credential.dto';

@Controller('basic')
export class BasicController {
  @Inject(BasicService)
  private readonly service: BasicService

  @Get()
  getSession() {
    return {}
  }

  @Post('auth')
  public async auth(@Body() body: CreateCredentialDto): Promise<boolean> {
    return this.service.check(body)
  }

  @Post('register')
  public async register(@Body() body: CreateCredentialDto): Promise<boolean> {
    return this.service.create(body)
  }
}
