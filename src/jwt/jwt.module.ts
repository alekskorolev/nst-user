import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt.config';
import { JwtAuthController } from './jwt.controller';
import { JwtAuthService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({

      useClass: JwtConfigService
    })
  ],
  controllers: [JwtAuthController],
  providers: [JwtAuthService, JwtStrategy, JwtConfigService],
  exports: [JwtAuthService]
})
export class JwtAuthModule {}
