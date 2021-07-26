import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
// Single-responsibility principle
// 하나의 모듈 클래스 펑션들이 하나의 기능은 꼭 책임져야 한다는 것.
@Controller('movies') // 라우터
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    // 쿼리 데코레이터
    // Search 부분이 get보다 밑에 있으면 NestJS는 Searchfmf id로 판단한다.
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id') // 아이디로 받아오기
  getOne(@Param('id') movieId: number): Movie {
    // 위에서 받은 아이디를 변수화 시켜서 movieId로 넘겨주는 일
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
