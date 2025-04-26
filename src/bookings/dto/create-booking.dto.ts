import { IsNotEmpty, IsString, IsInt, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID комнаты, которую бронируют' })
  roomId: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-05-01', description: 'Дата заезда' })
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-05-10', description: 'Дата выезда' })
  endDate: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'Вмещаемость номера' })
  guests: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Иван Иванов', description: 'Имя клиента' })
  contactName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'ivan@example.com', description: 'Email клиента' })
  contactEmail: string;
}
