import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// controllers
import { AppController } from './controllers';
// services
import { AppService } from './services/app.service';
import { TmdbService } from './services/tmdb.service';
// entities
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
      host: process.env.MARIADB_HOST,
      port: +process.env.MARIADB_PORT,
      username: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
      subscribers: ['**/subscribers/*.subscriber.js'],
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
