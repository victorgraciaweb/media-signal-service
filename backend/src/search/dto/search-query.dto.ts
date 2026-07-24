import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class SearchQueryDto extends PaginationDto {
  @ApiProperty({
    example: '(renewable* AND "clean energy") AND NOT nuclear',
    description:
      'Boolean search query. Supports AND, OR, AND NOT (uppercase only), nested parentheses, double-quoted phrases and * wildcards.',
  })
  @IsString()
  @IsNotEmpty()
  q: string;
}
