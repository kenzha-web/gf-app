import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h', 
          audience: configService.get<string>('JWT_TOKEN_AUDIENCE'),
          issuer: configService.get<string>('JWT_TOKEN_ISSUER'), },
      }),
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [
    AuthService, // Добавлено в массив провайдеров
    JwtModule,
    AccessTokenGuard,
    SignInProvider,
    RefreshTokensProvider,
    GenerateTokensProvider,
    GoogleAuthenticationService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [
    AuthService, // Экспортируем AuthService, если он нужен в других модулях
    JwtModule,
    AccessTokenGuard,
  ],
})
export class AuthModule {}
