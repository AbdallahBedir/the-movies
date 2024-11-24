## Description

Simple app that populate top rated movies from [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) to our DB and provide endpoints to list, filter, search, rate movies and add to watchlist.

## Project setup

1- create _.env_ file with values like the following:

```
MARIADB_HOST=db  // `db` name is required to match service name in compose file
MARIADB_PORT=3306
MARIADB_USER=abdallahbedir
MARIADB_PASSWORD=password
MARIADB_DATABASE=movies
TMDB_ACCESS_TOKEN=
REDIS_HOST=redis-12905.c250.eu-central-1-1.ec2.redns.redis-cloud.com
REDIS_PORT=12905
REDIS_PASSWORD=QsvtdHIlrOFdwhZZVkjX5IzgA6zWrSd6
```

2- run the following:

```bash
$ docker compose up
```

compose file runs mariadb DB first then build the image for NestJs app that connects to DB, run migrations to create tables, then listen for incoming requests

## API endpoints

- GET /movies
- GET /search
- POST /movie/:movie_id/rating
- POST /movie/:movie_id/favorite

## Project Structure

- controllers
  - classes that are responsible for handling incoming requests and returning responses to the client
- services
  - classes that contain functions (consumed by controllers) that make queries to DB using typeorm, find(), save(),...
- dto
  - interfaces describes endpints payload and query params
- entities
  - classes that maps to a database tables written with typeorm
- migrations
  - sql queries to update a database schema and apply new changes written with typeorm
- subscribers
  - classes that can listen to specific entity events, afterLoad, beforeInsert, ...etc
- utils
  - reusable functions that contains repeated logic, like **request()** to make api requests

## Caching

In order for caching to work, we need a redis working server, add the following env variables in .env file to make it work:

```bash
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

## Improvements

- Improve pagination result to be like the following:
  ```
  {
  "page": 1,
  "results": [],
  "total_pages": 0,
  "total_results": 0
  }
  ```
- Implement [Catch Everything Filter](https://docs.nestjs.com/exception-filters#catch-everything) for proper error handling to catch Http exceptions, UnhandledException, UncaughtException, ...etc
- Authentication to secure APIs
