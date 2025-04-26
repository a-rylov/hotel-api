import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminsController {
  
}