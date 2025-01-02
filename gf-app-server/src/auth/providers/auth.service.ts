import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ActiveUserData } from '../inteface/active-user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Вход в систему (Sign-In)
   */
  public async signIn(signInDto: SignInDto) {
    const user = await this.usersService.validateUserCredentials(
      signInDto.email,
      signInDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  /**
   * Обновление токенов (Refresh Tokens)
   */
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refreshToken);
      const user = await this.usersService.findOneById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      const newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new UnauthorizedException('Неверный refresh token');
    }
  }

  /**
   * Выход из системы (Logout)
   */
  public async logout(user: ActiveUserData) {
    // Здесь можно добавить логику работы с черным списком токенов, если требуется
    return {
      message: `Пользователь с ID ${user.sub} успешно вышел из системы`,
    };
  }
}
