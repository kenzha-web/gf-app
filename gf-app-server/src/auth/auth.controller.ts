import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserData } from './inteface/active-user-data.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dtos/signin.dto';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Войти в систему (Sign-In)' })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Неверные учетные данные',
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Обновить токен (Refresh Tokens)' })
  @ApiResponse({
    status: 200,
    description: 'Токены успешно обновлены',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Body() refreshTokensDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokensDto);
  }

  @ApiOperation({ summary: 'Выйти из системы (Logout)' })
  @ApiResponse({ status: 200, description: 'Выход успешно выполнен' })
  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  public logout(@ActiveUser() user: ActiveUserData) {
    return this.authService.logout(user);
  }
}
