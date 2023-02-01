import { Test, TestingModule } from '@nestjs/testing';
import { UserDemo } from './dto/user.demo.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const dto = UserDemo.dto
  const res_dto = UserDemo.res_dto

  const mockService = {
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...res_dto
      }
    }),

    getUsers: jest.fn(() => {
      return [res_dto]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).overrideProvider(UserService).useValue(mockService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect(await controller.store(dto),
    ).toEqual(res_dto)
  });

  it('should return list of users', async () => {
    expect(await controller.getUsers()).toEqual([res_dto])
  })

});
