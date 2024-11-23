import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const typeOrmOptions: DataSourceOptions = {
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: +process.env.MARIADB_PORT,
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  synchronize: false,
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  entities: [__dirname + '/entities/*.{js,ts}'],
  dateStrings: true,
};

const AppDataSource = new DataSource({
  ...typeOrmOptions,
});

export default AppDataSource;
