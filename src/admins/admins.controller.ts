import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminsController {
  @Get('data')
  getAdminData() {
    return { data: 'Secure admin data' };
  }
}