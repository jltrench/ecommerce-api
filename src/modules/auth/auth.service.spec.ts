import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { mockUser, mockUserWithoutPassword } from './test/auth.mock';
import type { UserWithPassword } from './test/auth.types';
import { PrismaService } from 'prisma/prisma.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(mockUser as UserWithPassword);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toBeDefined();
      expect((result as any).password).toBeUndefined();
      expect(result).toEqual(mockUserWithoutPassword);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should return null when user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toBeNull();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return token and user data when login is successful', async () => {
      const loginDto = { email: 'test@test.com', password: 'password' };

      jest
        .spyOn(service, 'validateUser')
        .mockResolvedValue(mockUserWithoutPassword);
      jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');

      const result = await service.login(loginDto);

      expect(result.access_token).toBe('test-token');
      expect(result.user).toEqual(mockUserWithoutPassword);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUserWithoutPassword.email,
        sub: mockUserWithoutPassword.id,
        role: mockUserWithoutPassword.role,
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const loginDto = { email: 'test@test.com', password: 'wrong-password' };

      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });
});
