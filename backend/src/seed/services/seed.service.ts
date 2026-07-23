import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import * as sampleArticles from '../sample_articles.json';

interface SampleArticle {
  id: number;
  headline: string;
  body: string;
  source: string;
  published_at: string;
  language: string;
}

/**
 * Loads the 20 sample articles required by the assignment.
 *
 * Clear-and-reinsert: the sample set is fixed and re-running the seed
 * should not accumulate duplicates. Article.id is a plain PrimaryColumn
 * (not auto-generated), so the sample ids are inserted as-is.
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute(): Promise<void> {
    await this.articleRepository.clear();

    const articles = (sampleArticles as SampleArticle[]).map((sample) =>
      this.articleRepository.create({
        id: sample.id,
        headline: sample.headline,
        body: sample.body,
        source: sample.source,
        // Column is a `date` typed as string (YYYY-MM-DD); the sample
        // data ships full ISO timestamps.
        publishedAt: sample.published_at.slice(0, 10),
        language: sample.language,
      }),
    );

    await this.articleRepository.save(articles);

    this.logger.log(`Seeded ${articles.length} articles`);
  }
}
