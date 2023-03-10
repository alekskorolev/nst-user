import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SessionConfigService } from 'src/shared/session/session.service';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(service: SessionConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: service.createJwtOptions().secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }

  /* authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, options?: any): void {
    console.log(req, options)
    super.authenticate(req, options)
  }*/
}