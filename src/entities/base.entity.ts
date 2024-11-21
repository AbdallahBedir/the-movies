import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  public createdAt?: Date;
  @UpdateDateColumn()
  public updatedAt?: Date;
}
