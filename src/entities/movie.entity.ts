import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tbl_movie')
export class MovieEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'overview',
    type: 'longtext',
    nullable: true,
  })
  overview?: string;

  @Column({
    name: 'poster_path',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  poster_path?: string;

  @Column({
    name: 'release_date',
    type: 'date',
    nullable: true,
  })
  release_date?: string;

  @Column({
    name: 'vote_average',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  vote_average?: number;

  @Column({
    name: 'vote_count',
    type: 'int',
    nullable: true,
  })
  vote_count?: number;

  @Column({
    name: 'genre_ids',
    type: 'text',
    nullable: true,
  })
  genre_ids?: string;
}
