import { Controller, Post, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Успешная аутентификация' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const admin = await this.authService.validateAdmin(
        loginDto.email, 
        loginDto.password
      );
      
      if (!admin) {
        throw new HttpException(
          { success: false, message: 'Неверные учетные данные' },
          HttpStatus.UNAUTHORIZED
        );
      }

      const tokens = await this.authService.login(admin);
      
      return {
        success: true,
        ...tokens
      };
    } catch (error) {
      throw new HttpException(
        { 
          success: false, 
          message: error.response?.message || 'Внутренняя ошибка сервера' 
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Токен обновлен' })
  @ApiResponse({ status: 401, description: 'Неверный refresh токен' })
  async refresh(@Body() body: { refresh_token: string }) {
    try {
      const result = await this.authService.refreshToken(body.refresh_token);
      return {
        success: true,
        access_token: result.access_token
      };
    } catch (e) {
      throw new HttpException(
        { success: false, message: 'Неверный refresh токен' },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}