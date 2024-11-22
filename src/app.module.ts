import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
