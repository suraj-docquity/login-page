import { Test, TestingModule } from '@nestjs/testing';
import { UserDemo } from 'src/user/dto/user.demo.dto';
import { SignupUserDTO } from '../user/dto/signupUser.dto';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  const dto = UserDemo.dto
  const res_dto = UserDemo.res_dto

  const mockService = {
    getTables: jest.fn(() => {
      return [res_dto]
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).overrideProvider(ProfileService).useValue(mockService).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of user', async () => {
    expect(await mockService.getTables()).toEqual([res_dto])
  })
});
