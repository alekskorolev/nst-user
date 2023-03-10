import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicModule } from './basic/basic.module';
import { ProfileModule } from './profile/profile.module';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { JwtModule } from '@nestjs/jwt';
import { SessionConfigService } from './shared/session/session.service';
import { JwtStrategy } from './guards/jwt.strategy';

const envFilePath: string = getEnvPath(`${__dirname}/../common/envs`);
console.log(envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    JwtModule.registerAsync({ useClass: SessionConfigService }),
    BasicModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [SessionConfigService, AppService, JwtStrategy]
})
export class AppModule {}
