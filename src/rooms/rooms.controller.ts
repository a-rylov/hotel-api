import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';
import { ApiTags, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'minCapacity', required: false, type: Number })
  @ApiQuery({ name: 'bedType', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Получен список комнат.' })
  async getAllRooms(
    @Query('maxPrice') maxPrice?: number,
    @Query('minCapacity') minCapacity?: number,
    @Query('bedType') bedType?: string
  ): Promise<Room[]> {
    return this.roomsService.findAll({ maxPrice, minCapacity, bedType })
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Получена информация о комнате.' })
  async getRoom(@Param('id') id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }
}
