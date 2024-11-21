import { Controller, Get, Query } from '@nestjs/common';

// services
import { AppService } from './services/app.service';
// entities
import { MovieEntity } from './entities';
// dto
import { ListMoviesParams, SearchMoviesParams } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('movies')
  listMovies(
    @Query() listMoviesParams: ListMoviesParams,
  ): Promise<MovieEntity> {
    return this.appService.listMovies(listMoviesParams);
  }

  @Get('search')
  searchMovie(
    @Query() searchMoviesParams: SearchMoviesParams,
  ): Promise<MovieEntity> {
    return this.appService.searchMovie(searchMoviesParams);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
