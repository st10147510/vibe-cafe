import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            validateUser: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_jwt_token'),
          },
        },
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token for a valid user', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser as any);
      jest.spyOn(authService, 'login').mockResolvedValue({ accessToken: 'test_jwt_token' });

      const result = await controller.login(mockUser.email, mockUser.password);
      expect(result).toEqual({ accessToken: 'test_jwt_token' });
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      jest.spyOn(authService, 'register').mockResolvedValue(mockUser as User);

      const result = await controller.register(mockUser.email, mockUser.password);
      expect(result).toEqual(mockUser);
    });
  });
});