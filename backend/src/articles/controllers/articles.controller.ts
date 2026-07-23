import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ArticleResponseDto } from '../dto';
import { ArticlesService } from '../services/articles.service';
import { PaginatedResponseDto } from '../../common/dtos/paginated-response.dto';
import { ListArticlesQueryDto } from '../dto/list-articles-query.dto';

/**
 * Articles HTTP controller
 *
 * Handles article-related endpoints
 * Delegates business logic to ArticlesService
 */
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Get all articles
   *
   * @returns ArticleResponseDto[]
   */
  @Get()
  findAll(
    @Query() query: ListArticlesQueryDto,
  ): Promise<PaginatedResponseDto<ArticleResponseDto>> {
    return this.articlesService.findAll(query);
  }

  /**
   * Get an article by its ID
   *
   * @param id Article UUID
   * @returns ArticleResponseDto
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleResponseDto> {
    return this.articlesService.findOne(id);
  }
}
