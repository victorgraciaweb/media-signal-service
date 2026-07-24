import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleResponseDto } from '../../articles/dto';
import { PaginatedResponseDto } from '../../common/dtos/paginated-response.dto';
import { SearchQueryDto } from '../dto';

/**
 * Service to search articles by boolean query
 *
 * The query resolution strategy (custom parser vs PostgreSQL FTS) is still
 * an open decision, so only the module wiring exists for now.
 */
@Injectable()
export class SearchArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async execute(
    query: SearchQueryDto,
  ): Promise<PaginatedResponseDto<ArticleResponseDto>> {
    const { q, limit = 10, offset = 0 } = query;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .orderBy('article.publishedAt', 'DESC')
      .take(limit)
      .skip(offset);

    queryBuilder.andWhere('article.source = :q', { q });

    const [articles, total] = await queryBuilder.getManyAndCount();

    return new PaginatedResponseDto<ArticleResponseDto>(
      articles.map((article) => new ArticleResponseDto(article)),
      total,
      Math.ceil(total / limit),
    );
  }
}
