import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Получение всех бронирований
  @Get()
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  // Получение одного бронирования по ID
  @Get(':id')
  async getBooking(@Param('id') id: number): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  // Создание нового бронирования
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }
}
