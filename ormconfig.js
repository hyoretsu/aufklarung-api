const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

module.exports = [
 {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.DB_NAME,
  entities: [`${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/modules/**/infra/typeorm/entities/*.${ext}`],
  migrations: [`dist/shared/infra/typeorm/migrations/*.${ext}`],
  cli: {
   migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
  ssl: process.env.NODE_ENV === 'production',
  extra: {
   ssl: {
    rejectUnauthorized: false,
   },
  },
 },
];
