import { ConnectionOptions } from 'typeorm';

const host = 'localhost';
const migrationsDir = 'src/shared/infra/typeorm/migrations';

const config: ConnectionOptions[] = [
 {
  name: 'default',
  type: 'postgres',
  host,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.DB_NAME,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: [`${migrationsDir}/*.ts`],
  cli: {
   migrationsDir,
  },
 },
];

export default config;
