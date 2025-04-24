import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>
  ) {}

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.findOne({ where: { email } });
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const result = await this.adminsRepository.query(
      `SELECT 1 FROM admins 
       WHERE email = $1 AND password_hash = crypt($2, password_hash)`,
      [email, password]
    );
    return result.length > 0;
  }
}