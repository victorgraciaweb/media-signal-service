import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../entities/article.entity';

export class ArticleResponseDto {
  @ApiProperty({
    example: 'b3f1c2e0-1a2b-4c3d-9e8f-123456789abc',
    description: 'Article unique identifier.',
  })
  id: string;

  @ApiProperty({
    example: 'Renewable energy investments hit record high',
    description: 'Article headline.',
  })
  headline: string;

  @ApiProperty({
    example: 'Global investments in renewable energy reached...',
    description: 'Full article body text.',
  })
  body: string;

  @ApiProperty({
    example: 'Reuters',
    description: 'Source that published the article.',
  })
  source: string;

  @ApiProperty({
    example: '2026-01-15',
    description: 'Publication date of the article (YYYY-MM-DD).',
  })
  publishedAt: string;

  @ApiProperty({
    example: 'en',
    description: 'Language code of the article content.',
  })
  language: string;

  @ApiProperty({
    example: '2026-07-22T21:35:42.158Z',
    description: 'Timestamp when the article was ingested.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-07-22T21:35:42.158Z',
    description: 'Timestamp when the article was last updated.',
  })
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
