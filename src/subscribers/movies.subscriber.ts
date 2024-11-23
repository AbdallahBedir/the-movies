import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

// entities
import { MovieEntity } from '../entities/movie.entity';

@EventSubscriber()
export class MovieSubscriber implements EntitySubscriberInterface<MovieEntity> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return MovieEntity;
  }

  afterLoad(entity: MovieEntity): Promise<any> | void {
    // return full image URL
    entity.poster_path = 'https://image.tmdb.org/t/p/w500' + entity.poster_path;
  }

  beforeInsert(event: InsertEvent<MovieEntity>): Promise<any> | void {
    if (Array.isArray(event.entity.genre_ids)) {
      const genreIdsArr = event.entity.genre_ids as number[];

      // save genre_ids as comma-separated in our DB as mysql doesn't support arrays
      event.entity.genre_ids = genreIdsArr.join(',');
    }
  }
}
