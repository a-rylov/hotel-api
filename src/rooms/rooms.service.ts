import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  async findAll(filters?: {
    maxPrice?: number
    minCapacity?: number
    bedType?: string
  }): Promise<Room[]> {
    const query = this.roomsRepository.createQueryBuilder('room')
    
    if (filters?.maxPrice) {
      query.andWhere('room.price <= :maxPrice', { maxPrice: filters.maxPrice })
    }
    
    if (filters?.minCapacity) {
      query.andWhere('room.capacity >= :minCapacity', { minCapacity: filters.minCapacity })
    }
    
    if (filters?.bedType) {
      query.andWhere('room.bedType = :bedType', { bedType: filters.bedType })
    }
    
    return query.getMany()
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }
}
