import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin@example.com', description: 'Email пользователя' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Пароль пользователя' })
  password: string;
}