import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Получен список бронирований' })
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Получено бронирование по ID' })
  async getBooking(@Param('id') id: number): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({ status: 201, description: 'Бронирование успешно создано' })
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }
}
