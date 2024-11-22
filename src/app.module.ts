import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TmdbService } from './services/tmdb.service';
import {
  MovieEntity,
  MovieRatingEntity,
  FavoriteMovieEntity,
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'db',
      port: 3306,
      username: 'abdallahbedir',
      password: 'password',
      database: 'movies',
      synchronize: false,
      autoLoadEntities: true,
      logging: true,
      cache: process.env.REDIS_HOST
        ? {
            type: 'redis',
            options: {
              password: process.env.REDIS_PASSWORD,
              socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
              },
            },
            duration: 120000, // 2 mins
          }
        : false,
    }),
    TypeOrmModule.forFeature([
      MovieEntity,
      MovieRatingEntity,
      FavoriteMovieEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TmdbService],
})
export class AppModule {}
