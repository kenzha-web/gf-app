import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

describe('GenerateTokensProvider', () => {
  let generateTokensProvider: GenerateTokensProvider;
  let jwtServiceMock: Partial<JwtService>;
  let jwtConfigMock: ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    jwtServiceMock = {
      signAsync: jest.fn().mockResolvedValue('mockedToken'), // Мокаем метод `signAsync`
    };

    jwtConfigMock = {
      secret: 'mockSecret',
      audience: 'mockAudience',
      issuer: 'mockIssuer',
      accessTokenTtl: 3600,
      refreshTokenTtl: 86400,
      googleClientId: 'mockGoogleClientId',
      googleClientSecret: 'mockGoogleClientSecret',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateTokensProvider,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: jwtConfig.KEY, useValue: jwtConfigMock },
      ],
    }).compile();

    generateTokensProvider = module.get<GenerateTokensProvider>(GenerateTokensProvider);
  });

  it('should be defined', () => {
    expect(generateTokensProvider).toBeDefined();
  });

  it('should generate tokens', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      role: 'USER', // Используйте корректное значение роли
    };

    const tokens = await generateTokensProvider.generateTokens(user as any); // Приведение к `any` для теста
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
    expect(jwtServiceMock.signAsync).toHaveBeenCalledTimes(2);
  });
});