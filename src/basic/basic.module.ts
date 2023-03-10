import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { LocalStrategy } from 'src/guards/local.strategy';
import { Credential } from './credentisl.entity';
import { JwtModule } from '@nestjs/jwt';
import { SessionConfigService } from 'src/shared/session/session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credential]),
    ProfileModule,
    JwtModule.registerAsync({ useClass: SessionConfigService })
  ],
  controllers: [BasicController],
  providers: [BasicService, LocalStrategy],
})
export class BasicModule {}
