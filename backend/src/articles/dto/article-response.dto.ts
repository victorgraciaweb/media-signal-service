import { Article } from '../entities/article.entity';

export class ArticleResponseDto {
  id: string;
  headline: string;
  body: string;
  source: string;
  publishedAt: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(article: Article) {
    this.id = article.id;
    this.headline = article.headline;
    this.body = article.body;
    this.source = article.source;
    this.publishedAt = article.publishedAt;
    this.language = article.language;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }
}
