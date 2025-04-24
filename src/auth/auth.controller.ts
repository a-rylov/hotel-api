import { Controller, Post, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
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

      const { access_token } = await this.authService.login(admin);
      
      return {
        success: true,
        access_token
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
}