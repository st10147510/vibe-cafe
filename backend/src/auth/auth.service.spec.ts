import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate a user with correct credentials', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' } as User;
      jest.spyOn(userService, 'validateUser').mockResolvedValue(mockUser);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userService, 'validateUser').mockResolvedValue(null);

      const result = await service.validateUser('wrong@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should generate a JWT token for a valid user', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'user' } as User;
      const result = await service.login(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith({ email: mockUser.email, sub: mockUser.id, role: mockUser.role });
      expect(result).toEqual({ accessToken: 'test_jwt_token' });
    });
  });
});