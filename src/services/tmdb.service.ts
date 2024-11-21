import { Injectable } from '@nestjs/common';

// config
import { request } from '../config/request';
// dto
import { ListMoviesParams, SearchMoviesParams } from '../dto';

const accountId = 21640633;

@Injectable()
export class TmdbService {
  async listTopRatedMovies(listMoviesParams: ListMoviesParams) {
    try {
      return await request('movie/top_rated', listMoviesParams);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async searchMovie(searchMoviesParams: SearchMoviesParams) {
    try {
      return await request('search/movie', searchMoviesParams);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async addToWatchlist(movieId: number) {
    try {
      const payload = {
        media_type: 'movie',
        media_id: movieId,
        watchlist: true,
      };

      return await request(`account/${accountId}/watchlist`, payload, 'POST');
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
