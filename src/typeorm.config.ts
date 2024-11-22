import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const typeOrmOptions: DataSourceOptions = {
  type: 'mariadb',
  host: 'db',
  port: 3306,
  username: 'abdallahbedir',
  password: 'password',
  database: 'movies',
  synchronize: false,
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  entities: [__dirname + '/entities/*.{js,ts}'],
  dateStrings: true,
};

const AppDataSource = new DataSource({
  ...typeOrmOptions,
});

export default AppDataSource;
