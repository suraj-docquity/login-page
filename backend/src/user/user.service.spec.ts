import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDemo } from './dto/user.demo.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let spyUserFindOne: jest.SpyInstance;
  let spyUserExists: jest.SpyInstance;

  const dto = UserDemo.dto
  const res_dto = UserDemo.res_dto

  const mockUserRepository = {

    findOne: jest.fn(),
    createUser: jest.fn(),

    find: jest.fn().mockImplementation(() => [dto]),
    save: jest.fn().mockImplementation((dto) => dto),

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(User), useValue: mockUserRepository, }],
    }).compile();

    service = module.get<UserService>(UserService);

    spyUserFindOne = jest.spyOn(mockUserRepository, 'findOne');
    spyUserExists = jest.spyOn(service, 'createUser');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user and return it', async () => {
    expect(await service.createUser(dto)).toEqual(res_dto)
  })

  it('should return user if exists', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(dto));
    await expect(service.findByEmail("suraj@docquity.com")).resolves.toStrictEqual(res_dto)
  })

  it('should return null if user does not exists', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(null));
    expect(await service.findByEmail("user@docquity.com")).toEqual(null)
  })

  it('should return user exists message if user exists', async () => {
    spyUserExists.mockImplementationOnce((userExists = true) => Promise.resolve({
      status: 409,
      Message: 'User already exists'
    }))
    expect(await service.createUser(dto)).toEqual({
      status: 409,
      Message: 'User already exists'
    })
  })


  it('should return list of users',async () => {
    expect(await service.getUsers()).toEqual([res_dto])
  })


});
