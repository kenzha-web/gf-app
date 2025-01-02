import { Test, TestingModule } from '@nestjs/testing';
import { SignInProvider } from './sign-in.provider';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensProvider } from './generate-tokens.provider';

describe('SignInProvider', () => {
  let signInProvider: SignInProvider;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let hashingProvider: Partial<Record<keyof HashingProvider, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let generateTokensProvider: Partial<Record<keyof GenerateTokensProvider, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      findOneByEmail: jest.fn(),
    };

    hashingProvider = {
      comparePassword: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mockToken'),
    };

    generateTokensProvider = {
      generateTokens: jest.fn().mockResolvedValue({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInProvider,
        { provide: UsersService, useValue: usersService },
        { provide: HashingProvider, useValue: hashingProvider },
        { provide: JwtService, useValue: jwtService },
        { provide: GenerateTokensProvider, useValue: generateTokensProvider },
        // Добавляем мок для CONFIGURATION(jwt)
        { provide: 'CONFIGURATION(jwt)', useValue: { secret: 'mockSecret', expiresIn: '1h' } },
      ],
    }).compile();

    signInProvider = module.get<SignInProvider>(SignInProvider);
  });

  it('should call UsersService.findOneByEmail and return tokens', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
    };

    usersService.findOneByEmail.mockResolvedValue(mockUser);
    hashingProvider.comparePassword.mockResolvedValue(true);

    const dto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const tokens = await signInProvider.signIn(dto);

    expect(tokens.accessToken).toBe('mockAccessToken');
    expect(tokens.refreshToken).toBe('mockRefreshToken');
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
    };

    usersService.findOneByEmail.mockResolvedValue(mockUser);
    hashingProvider.comparePassword.mockResolvedValue(false);

    const dto = {
      email: 'test@example.com',
      password: 'wrongPassword',
    };

    await expect(signInProvider.signIn(dto)).rejects.toThrow(UnauthorizedException);
  });
});