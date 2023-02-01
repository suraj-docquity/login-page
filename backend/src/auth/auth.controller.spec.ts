import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockService = {

    login: jest.fn(() => {
      return {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cmFqQGRvY3F1aXR5LmNvbSIsInN1YiI6MSwiaWF0IjoxNjc1MTYzNDQ1LCJleHAiOjE2NzUxNjcwNDV9.lV5Uvy7alWwAaIhIkMHn-JHQvxRf6FPKuYHFDPPoCdE",
        "status": 200
      }
    })

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).overrideProvider(AuthService).useValue(mockService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return token and status after successful login', async () => {
    expect(await mockService.login()).toEqual({
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cmFqQGRvY3F1aXR5LmNvbSIsInN1YiI6MSwiaWF0IjoxNjc1MTYzNDQ1LCJleHAiOjE2NzUxNjcwNDV9.lV5Uvy7alWwAaIhIkMHn-JHQvxRf6FPKuYHFDPPoCdE",
      "status": 200
    })
  })




});
