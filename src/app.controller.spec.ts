import { Test, TestingModule } from '@nestjs/testing';

// controllers
import { AppController } from './app.controller';
// services
import { AppService } from './services/app.service';
import { TmdbService } from './services/tmdb.service';
// entities
import { MovieEntity } from './entities';

const movies: MovieEntity[] = [
  {
    id: 29259,
    title: 'Le Trou',
    overview:
      'Four prison inmates have been hatching a plan to literally dig out of jail',
    poster_path: '/8kxtOm7D992iAaOzUoWmNQwbXjs.jpg',
    release_date: '1960-03-18',
    vote_average: 8.3,
    vote_count: 471,
    genre_ids: '18,53,80',
  },
  {
    id: 40096,
    title: "A Dog's Will",
    overview:
      'The lively João Grilo and the sly Chicó are poor guys living in the hinterland who cheat a bunch of people in a small town in Northeastern Brazil. When they die, they have to be judged by Christ, the Devil and the Virgin Mary before they are admitted to paradise.',
    poster_path: '/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg',
    release_date: '2000-09-15',
    vote_average: 8.4,
    vote_count: 1098,
    genre_ids: '35,18,14',
  },
];

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        TmdbService,
        {
          provide: AppService,
          useValue: {
            listMovies: jest.fn().mockResolvedValue(movies),
            searchMovie: jest.fn().mockResolvedValue(movies),
            rateMovie: jest
              .fn()
              .mockImplementation((movie_id: string, value: number) =>
                Promise.resolve({
                  id: 123456,
                  movie_id,
                  value,
                }),
              ),
            addMovieToFavorite: jest
              .fn()
              .mockImplementation((movie_id: string) =>
                Promise.resolve({
                  id: 123456,
                  movie_id,
                }),
              ),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('listMovies', () => {
    it('should list all movies', async () => {
      const query = { genre_id: 55, page: 1 };
      await appController.listMovies(query);

      expect(appService.listMovies).toHaveBeenCalledWith(query);
    });
  });

  describe('searchMovie', () => {
    it('should search for a movie', async () => {
      const query = { query: 'Dog', page: 1 };
      await appController.searchMovie(query);

      expect(appService.searchMovie).toHaveBeenCalledWith(query);
    });
  });

  describe('rateMovie', () => {
    it('should rate movie successfully', async () => {
      const movie_id = '54698';
      const value = 9.5;

      const ratedMovie = await appController.rateMovie(movie_id, value);

      expect(appService.rateMovie).toHaveBeenCalledWith(movie_id, value);
      expect(ratedMovie).toEqual({
        id: 123456,
        movie_id,
        value,
      });
    });
  });

  describe('addMovieToFavorite', () => {
    it('should add movie to favorite successfully', async () => {
      const movie_id = '99999';

      const favoriteMovie = await appController.addMovieToFavorite(movie_id);

      expect(appService.addMovieToFavorite).toHaveBeenCalledWith(movie_id);
      expect(favoriteMovie).toEqual({
        id: 123456,
        movie_id,
      });
    });
  });
});
