import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { BasicStrategy } from './basic.strategy';
import { Credential } from './credentisl.entity';
import { JwtAuthModule } from 'src/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credential]),
    ProfileModule,
    JwtAuthModule,
  ],
  controllers: [BasicController],
  providers: [BasicService, BasicStrategy],
})
export class BasicModule {}
