import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getEnvPath } from './src/common/helper/env.helper';
import { config } from 'dotenv';

 
const envFilePath: string = getEnvPath(`${__dirname}/src/common/envs`);

console.log(config({ path: envFilePath }))

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file'
});