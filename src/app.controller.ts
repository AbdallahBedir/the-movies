import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';

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

  @Post('movie/:movie_id/rating')
  rateMovie(
    @Param('movie_id') movie_id: string,
    @Body('value') value: number,
  ): Promise<MovieEntity> {
    return this.appService.rateMovie(movie_id, value);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
