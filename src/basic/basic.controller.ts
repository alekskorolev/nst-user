import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { BasicService } from './basic.service';
import { CreateCredentialDto, CredentialDto, TokenDto } from './credential.dto';

@Controller('basic')
export class BasicController {
  @Inject(BasicService)
  private readonly service: BasicService;

  @UseGuards(JwtAuthGuard)
  @Get()
  getSession(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  public async auth(@Request() req): Promise<TokenDto> {
    return this.service.login(req.user)
  }

  @Post('register')
  public async register(@Body() body: CreateCredentialDto): Promise<boolean> {
    return this.service.create(body);
  }
}
