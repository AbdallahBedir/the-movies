import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { MovieEntity } from './movie.entity';

@Entity('tbl_movie_rating')
export class MovieRatingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @JoinColumn({
    foreignKeyConstraintName: 'tbl_movie_rating_fk_movie_id_tbl_movie',
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

  @Column({
    name: 'value',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: false,
  })
  value: number;
}
