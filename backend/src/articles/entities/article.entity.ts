import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column('text')
  headline: string;

  @Column('text')
  body: string;

  @Column('text')
  source: string;

  @Column('date')
  publishedAt: string;

  @Column('text')
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
