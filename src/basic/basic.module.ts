import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { Credential } from './credentisl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credential]), ProfileModule],
  controllers: [BasicController],
  providers: [BasicService],
})
export class BasicModule {}
