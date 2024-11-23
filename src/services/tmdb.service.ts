import { Injectable } from '@nestjs/common';

// config
import { request } from '../utils';
// dto
import { ListMoviesParams } from '../dto';

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
}
