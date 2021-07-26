import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes( //테스팅 환경도 실제 구동 환경과 동일하게 해줘야 한다, 스트링과 넘버 예제 기억하자
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
    describe('/movies/:id', () => {
      it('GET 200', () => {
        return request(app.getHttpServer()).get('/movies/1').expect(200);
      });
      it('GET 404', () => {
        return request(app.getHttpServer()).get('/movies/999').expect(404);
      });
      it('POST 400', () => {
        return request(app.getHttpServer())
          .post('/movies')
          .send({
            title: 'Updated Test',
            year: 2000,
            genres: ['test'],
            other: 'thing', // 일부러 파이프 테스트를 위해 잘못된 포스트 추가 
          })
          .expect(400);
      });
      it('DELETE 200', () => {
        // eslint-disable-next-line prettier/prettier
        return request(app.getHttpServer())
          .delete('/movies/1')
          .expect(200);
      });
    });
  });
});
