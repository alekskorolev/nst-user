import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class SessionConfigService implements JwtOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createJwtOptions(): JwtModuleOptions {
    // console.log(this.config.get('SESSION_EXPIRATION'))
    return {
      signOptions: {
        expiresIn: this.config.get('SESSION_EXPIRATION'),
      },
      secret: this.config.get('JWT_SECRET'),
    };
  }
}
