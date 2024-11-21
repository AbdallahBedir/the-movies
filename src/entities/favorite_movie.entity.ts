import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { MovieEntity } from './movie.entity';

@Entity('tbl_favorite_movie')
@Index(
  'tbl_favorite_movie_client_movie_unique_index',
  ['movie_id', 'client_id'],
  {
    unique: true,
  },
)
export class FavoriteMovieEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @JoinColumn({
    foreignKeyConstraintName: 'tbl_favorite_movie_fk_movie_id_tbl_movie',
    name: 'fk_movie_id',
  })
  @ManyToOne(() => MovieEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Column({
    name: 'fk_movie_id',
    type: 'int',
    nullable: false,
  })
  movie_id: string;

  @Column({
    name: 'client_id',
    type: 'int',
    nullable: false,
  })
  client_id: number;
}
