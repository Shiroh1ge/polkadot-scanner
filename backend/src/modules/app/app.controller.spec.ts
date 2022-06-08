import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('get should call sendFile method correctly', () => {
    const mockResponse = { sendFile: jest.fn() } as unknown as Response;
    appController.get(mockResponse);

    expect(mockResponse.sendFile).toBeCalledTimes(1);
    expect(mockResponse.sendFile).toBeCalledWith('index.html', { root: './src/static/build' });
  });
});
