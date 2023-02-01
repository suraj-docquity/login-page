import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDemo } from '../user/dto/user.demo.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let spyUserFindOne: jest.SpyInstance;

  const mockjwtService = {
    sign: jest.fn().mockImplementation(() => {
      return {
        access_token: 'Gives_access_token',
      };
    }),
  };

  const mockUserRepository = {
    // findOne: jest.fn().mockImplementationOnce(()=>{
    //   return UserDemo.res_dto;
    // })

    findOne: jest.fn()

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, { provide: JwtService, useValue: mockjwtService }, { provide: getRepositoryToken(User), useValue: mockUserRepository, }],
    }).compile();

    spyUserFindOne = jest.spyOn(mockUserRepository, 'findOne');
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user if user exists', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(UserDemo.res_dto));
    expect(await service.validateUser(UserDemo.dto.Email, UserDemo.dto.Password)).toEqual(UserDemo.res_dto)
  })

  it('should login user after successful validation', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(UserDemo.res_dto));
    expect(await service.validateUser(UserDemo.dto.Email, UserDemo.dto.Password)).toEqual(UserDemo.res_dto)
    expect(await service.login(UserDemo.dto)).toEqual({
      access_token: { access_token: 'Gives_access_token' },
      status: 200,
    })
  })

  it('should return null for invalid validation',async () => {
    spyUserFindOne.mockImplementationOnce(() => {
      Promise.resolve(null)
    })
    expect(await service.validateUser(UserDemo.dto.Email, UserDemo.dto.Password)).toEqual(null)
  })
});
