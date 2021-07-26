import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 컨트롤러는 URL을 가져오고 펑션을 리턴하는 임무
// 서비스는 위의 펑션(비즈니스 로직)을 실행하는 임무

@Module({
  // 데코레이터, 클래스에 함수기능을 추가한다.
  imports: [MoviesModule],
  controllers: [AppController], // URL가져오고, 함수를 실행하는 컨트롤러
  providers: [],
})
export class AppModule {}

// Dependancy Injection
// 