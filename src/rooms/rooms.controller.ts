import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getAllRooms(
    @Query('maxPrice') maxPrice?: number,
    @Query('minCapacity') minCapacity?: number,
    @Query('bedType') bedType?: string
  ): Promise<Room[]> {
    return this.roomsService.findAll({ maxPrice, minCapacity, bedType })
  }

  @Get(':id')
  async getRoom(@Param('id') id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }
}
