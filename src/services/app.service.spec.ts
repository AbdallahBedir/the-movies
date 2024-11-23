import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, FindOperator } from 'typeorm';

//entities
import {
  MovieEntity,
  MovieRatingEntity,
  FavoriteMovieEntity,
} from '../entities';
//services
import { TmdbService } from '../services/tmdb.service';
import { AppService, pageLimit, cacheTTL } from '../services/app.service';

const movies: any[] = [
  {
    id: 29259,
    title: 'Le Trou',
    overview:
      'Four prison inmates have been hatching a plan to literally dig out of jail',
    poster_path: '/8kxtOm7D992iAaOzUoWmNQwbXjs.jpg',
    release_date: '1960-03-18',
    vote_average: 8.3,
    vote_count: 471,
    genre_ids: [18, 53, 80],
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
    genre_ids: [35, 18, 14],
  },
];

describe('AppService', () => {
  let appService: AppService;
  let tmdbService: TmdbService;
  let movierepository: Repository<MovieEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmdbService,
        AppService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(movies),
            save: jest.fn().mockResolvedValue(movies),
          },
        },
        {
          provide: getRepositoryToken(MovieRatingEntity),
          useValue: {
            save: jest.fn().mockImplementation(({ movie_id, value }) =>
              Promise.resolve({
                id: 123456,
                movie_id,
                value,
              }),
            ),
          },
        },
        {
          provide: getRepositoryToken(FavoriteMovieEntity),
          useValue: {
            save: jest.fn().mockImplementation(({ movie_id }) =>
              Promise.resolve({
                id: 123456,
                movie_id,
              }),
            ),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    tmdbService = module.get<TmdbService>(TmdbService);
    movierepository = module.get<Repository<MovieEntity>>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('onModuleInit()', () => {
    it('do nothing if data is already populated', async () => {
      const listMoviesSpy = jest
        .spyOn(appService, 'listMovies')
        .mockResolvedValueOnce(movies);

      const listTopRatedMoviesSpy = jest.spyOn(
        tmdbService,
        'listTopRatedMovies',
      );

      const result = await appService.onModuleInit();
      expect(result).toBe(undefined);

      expect(listMoviesSpy).toHaveBeenCalled();

      // if data already exist, tmdbService should not be called
      expect(listTopRatedMoviesSpy).not.toHaveBeenCalled();
    });

    it('call tmdbService if no data in our DB yet', async () => {
      const listMoviesSpy = jest
        .spyOn(appService, 'listMovies')
        .mockResolvedValueOnce(null);

      const listTopRatedMoviesSpy = jest
        .spyOn(tmdbService, 'listTopRatedMovies')
        .mockResolvedValue({ results: movies });

      await appService.onModuleInit();

      expect(listMoviesSpy).toHaveBeenCalled();

      // if data already exist, tmdbService should not be called
      expect(listTopRatedMoviesSpy).toHaveBeenNthCalledWith(10, {
        page: expect.any(Number),
      });
    });
  });

  describe('listMovies()', () => {
    it('call DB with default options if no params are passed', async () => {
      const repoSpy = jest.spyOn(movierepository, 'find');

      await appService.listMovies();

      expect(repoSpy).toHaveBeenCalledWith({
        take: pageLimit,
        skip: 0,
        cache: cacheTTL,
      });
    });

    it('pass params to DB correctly if params are passed', async () => {
      const repoSpy = jest.spyOn(movierepository, 'find');

      await appService.listMovies({ page: 3, genre_id: 5 });

      expect(repoSpy).toHaveBeenCalledWith({
        take: pageLimit,
        skip: pageLimit * 2,
        cache: cacheTTL,
        where: {
          genre_ids: expect.any(FindOperator),
        },
      });
    });
  });

  describe('searchMovie()', () => {
    it('pass params to DB correctly', async () => {
      const repoSpy = jest.spyOn(movierepository, 'find');

      await appService.searchMovie({ query: 'abc' });

      expect(repoSpy).toHaveBeenCalledWith({
        take: pageLimit,
        skip: 0,
        cache: cacheTTL,
        where: [
          {
            title: expect.any(FindOperator),
          },
          {
            overview: expect.any(FindOperator),
          },
        ],
      });
    });
  });

  describe('rateMovie()', () => {
    it('return saved rated movie', async () => {
      const movie_id = '54698';
      const value = 9.5;

      const result = await appService.rateMovie(movie_id, value);

      expect(result).toEqual(
        expect.objectContaining({
          movie_id,
          value,
        }),
      );
    });
  });

  describe('addMovieToFavorite()', () => {
    it('return added to favorite movie', async () => {
      const movie_id = '54698';

      const result = await appService.addMovieToFavorite(movie_id);

      expect(result).toEqual(
        expect.objectContaining({
          movie_id,
        }),
      );
    });
  });
});
