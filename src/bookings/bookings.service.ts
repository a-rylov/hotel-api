import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { NotFoundException } from '@nestjs/common';
import { Room } from '../rooms/room.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  // Создание нового бронирования
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { roomId, startDate, endDate, guests, contactName, contactEmail } = createBookingDto;

    // Проверка, существует ли комната с таким ID
    const room = await this.roomsRepository.findOne( { where: { id: roomId } } );
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Создаем новый объект бронирования
    const booking = this.bookingsRepository.create({
      room,
      startDate,
      endDate,
      guests,
      contactName,
      contactEmail,
    });

    return this.bookingsRepository.save(booking);
  }

  // Получение всех бронирований
  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({ 
      relations: ['room']
    })
  }

  // Получение бронирования по ID
  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ where: { id }, relations: ['room'] });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }
}
