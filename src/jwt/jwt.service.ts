import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto, TokenDto } from 'src/basic/credential.dto';

@Injectable()
export class JwtAuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async parseToken(token: string) {
    const payload = await this.jwtService.decode(token)
    return payload;
  }

  public async login(user: CredentialDto): Promise<TokenDto> {
    const payload = { username: user.login, sub: user.profile.id }
    return {
      access_token: await this.jwtService.signAsync(payload, {secret: ''})
    }
  }
}