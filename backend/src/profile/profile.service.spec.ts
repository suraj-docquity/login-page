import { Test, TestingModule } from '@nestjs/testing';
import { UserDemo } from 'src/user/dto/user.demo.dto';
import { UserService } from '../user/user.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  const user = UserDemo.res_dto

  const mockService = {
    getUsers : jest.fn(() => {
      return [user]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService,UserService],
    }).overrideProvider(UserService).useValue(mockService).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of user', async () => {
    expect(await mockService.getUsers()).toEqual([user])
  })

});