import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = await AppDataSource.initialize();

  // run migrations, create tables,...
  const migrations = await dataSource.runMigrations();
  console.log(`migrations`, migrations);

  await app.listen(8080);
}
bootstrap();
