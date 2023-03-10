import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BasicService } from 'src/basic/basic.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: BasicService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.service.validate({login: username, password});

    console.log(username, password, user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}