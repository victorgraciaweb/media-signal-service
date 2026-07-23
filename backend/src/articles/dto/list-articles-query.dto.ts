import { IsOptional, IsString, IsDateString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class ListArticlesQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
