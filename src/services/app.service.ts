import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';

//services
import { TmdbService } from '../services';
//entities
import {
  MovieEntity,
  MovieRatingEntity,
  FavoriteMovieEntity,
} from '../entities';
// dto
import { ListMoviesParams, SearchMoviesParams } from '../dto';

export const pageLimit = 20;
export const cacheTTL = 60000;

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly tmdbService: TmdbService,
    @InjectRepository(MovieEntity)
    private readonly movieRepo: Repository<MovieEntity>,
    @InjectRepository(MovieRatingEntity)
    private readonly movieRatingRepo: Repository<MovieRatingEntity>,
    @InjectRepository(FavoriteMovieEntity)
    private readonly favoriteMovieRepo: Repository<FavoriteMovieEntity>,
  ) {}

  async onModuleInit() {
    const data = await this.listMovies();

    console.log(`current data length`, data.length);

    // if data already populated in our DB, exit;
    if (data?.length > 0) return;

    // our DB is empty, populate 10 pages of top rated movies from TMDB into our DB (`tbl_movie` table)
    const promises = Array(10)
      .fill(0)
      .map(async (_, index) => {
        const response = await this.tmdbService.listTopRatedMovies({
          page: index + 1,
        });

        const movies = response?.results.map((movie) => ({
          ...movie,
          // save genre_ids as comma-separated in our DB as mysql doesn't support arrays
          genre_ids: movie.genre_ids.join(','),
        }));

        try {
          await this.movieRepo.save(movies);
        } catch (error) {
          console.error(error);
        }
      });

    await Promise.all(promises);
  }

  async listMovies(
    listMoviesParams: ListMoviesParams = {},
  ): Promise<MovieEntity[]> {
    const { genre_id, page = 1 } = listMoviesParams;

    let options: FindManyOptions<MovieEntity> = {
      take: pageLimit,
      skip: pageLimit * (page - 1),
      cache: cacheTTL,
    };

    if (genre_id) {
      options = {
        ...options,
        where: {
          genre_ids: Like(`%${genre_id}%`),
        },
      };
    }

    try {
      return await this.movieRepo.find(options);
    } catch (err) {
      return err;
    }
  }

  async searchMovie(
    searchMoviesParams: SearchMoviesParams,
  ): Promise<MovieEntity[]> {
    const { query, page = 1 } = searchMoviesParams;

    let options: FindManyOptions<MovieEntity> = {
      take: pageLimit,
      skip: pageLimit * (page - 1),
      cache: cacheTTL,
    };

    if (query) {
      options = {
        ...options,
        where: [
          { title: Like(`%${query}%`) },
          { overview: Like(`%${query}%`) },
        ],
      };
    }

    try {
      return await this.movieRepo.find(options);
    } catch (err) {
      return err;
    }
  }

  async rateMovie(movie_id: string, value: number): Promise<MovieRatingEntity> {
    try {
      return await this.movieRatingRepo.save({
        client_id: 1,
        movie_id,
        value,
      });
    } catch (err) {
      return err;
    }
  }

  async addMovieToFavorite(movie_id: string): Promise<FavoriteMovieEntity> {
    try {
      return await this.favoriteMovieRepo.save({
        client_id: 1,
        movie_id,
      });
    } catch (err) {
      return err;
    }
  }
}
