import { Injectable, NotImplementedException } from '@nestjs/common';
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

  execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: SearchQueryDto,
  ): Promise<PaginatedResponseDto<ArticleResponseDto>> {
    throw new NotImplementedException('Boolean search is not implemented yet');
  }
}
