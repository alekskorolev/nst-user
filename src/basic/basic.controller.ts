import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { BasicGuard } from './basic.guard';
import { JwtAuthService } from 'src/jwt/jwt.service';
import { BasicService } from './basic.service';
import { CreateCredentialDto, CredentialDto, TokenDto } from './credential.dto';

@Controller('basic')
export class BasicController {
  @Inject(BasicService)
  private readonly service: BasicService;

  @Inject(JwtAuthService)
  private readonly jwtAuthService: JwtAuthService;

  @UseGuards(JwtAuthGuard)
  @Get()
  getSession(@Request() req) {
    return req.user;
  }

  @UseGuards(BasicGuard)
  @Post('auth')
  public async auth(@Request() req): Promise<TokenDto> {
    return this.jwtAuthService.login(req.user)
  }

  @Post('register')
  public async register(@Body() body: CreateCredentialDto): Promise<boolean> {
    return this.service.create(body);
  }
}
