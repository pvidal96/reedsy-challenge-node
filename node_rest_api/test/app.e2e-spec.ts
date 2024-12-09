import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { JobModule } from '../src/modules/job.module';
import { BookModule } from '../src/modules/book.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '../src/datasource/typeorm.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule, //TODO DO NOT USE REAL DB, USE E2E SPECIFIC ONE
        BookModule,
        JobModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  describe('book import/export tests', () => {
    it('/books/import (POST) success', async () => {
      const response = await request(app.getHttpServer())
        .post('/books/import')
        .send({
          bookId: 'aBookId',
          type: 'word',
          url: 'test',
        });
      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeGreaterThan(0); //TODO When using a test db, use equal fix value
    });

    it('/books/export (POST) success', async () => {
      const response = await request(app.getHttpServer())
        .post('/books/export')
        .send({
          bookId: 'aBookId',
          type: 'pdf',
        });
      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeGreaterThan(0); //TODO When using a test db, use equal fix value
    });

    it('/books/export (POST) with bad format', async () => {
      const response = await request(app.getHttpServer())
        .post('/books/export')
        .send({
          bookId: 'id',
          type: 'word',
        });
      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual([
        'Type must be one of the following values: epub, pdf',
      ]);
    });

    it('/books/import (POST) missing argument', async () => {
      const response = await request(app.getHttpServer())
        .post('/books/import')
        .send({
          bookId: 'id',
          type: 'word',
        });
      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual(['url must be a string']);
    });
  });

  describe('list jobs tests', () => {
    it('/jobs/import (GET) success', async () => {
      const response = await request(app.getHttpServer())
        .get('/jobs/import')
        .send();
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual({
        id: 1,
        type: 'import',
        status: 'in-progress',
        data: {
          bookId: 'aBookId',
          type: 'word',
          url: 'test',
        },
        errorMsg: null,
        created_at: response.body[0].created_at,
        updated_at: response.body[0].updated_at,
      });
    });

    it('/jobs/export (GET) success', async () => {
      const response = await request(app.getHttpServer())
        .get('/jobs/export')
        .send();
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual({
        id: 2,
        type: 'export',
        status: 'in-progress',
        data: {
          bookId: 'aBookId',
          type: 'pdf',
        },
        errorMsg: null,
        created_at: response.body[0].created_at,
        updated_at: response.body[0].updated_at,
      });
    });
  });
});
