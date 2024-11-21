import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { mockUserWithoutPassword } from './test/auth.mock';
import { PrismaService } from 'prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return token when credentials are valid', async () => {
      const loginDto = { email: 'test@test.com', password: 'password' };

      jest.spyOn(service, 'login').mockResolvedValue({
        user: mockUserWithoutPassword,
        access_token: 'test-token',
      });

      const result = await controller.login(loginDto);

      expect(result.access_token).toBeDefined();
      expect(result.user).toEqual(mockUserWithoutPassword);
    });
  });
});
