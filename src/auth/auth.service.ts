import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminsService.findByEmail(email);    
    if (!admin) return null;
    
    const isValid = await this.adminsService.validatePassword(email, password);    
    if (!isValid) return null;
    
    return { id: admin.id, email: admin.email };
  }

  async login(admin: any) {
    return {
      access_token: this.jwtService.sign({ 
        email: admin.email, 
        sub: admin.id 
      }),
    };
  }
}