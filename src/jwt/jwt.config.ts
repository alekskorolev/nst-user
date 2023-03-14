import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createJwtOptions(): JwtModuleOptions {
    return {
      signOptions: {
        expiresIn: this.config.get('SESSION_EXPIRATION'),
      },
      secret: this.config.get('JWT_SECRET')
    };
  }
}
