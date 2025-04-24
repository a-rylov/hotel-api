import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms/room.entity';
import { Booking } from './bookings/booking.entity';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admins/admin.entity';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hotel',
      entities: [Room, Booking, Admin],
      autoLoadEntities: true,
      synchronize: false,
    }),
    
    RoomsModule,
    BookingsModule,
    AuthModule,
    AdminsModule,
  ]
})
export class AppModule {}
