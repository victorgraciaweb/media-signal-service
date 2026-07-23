import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';
import { SeedService } from './services/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
