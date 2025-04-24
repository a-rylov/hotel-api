import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Room } from '../rooms/room.entity'

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'room_id' })
  roomId: number

  @ManyToOne(() => Room, room => room.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: Room

  @Column({ name: 'start_date', type: 'date' })
  startDate: string

  @Column({ name: 'end_date', type: 'date' })
  endDate: string

  @Column('int')
  guests: number

  @Column({ name: 'contact_name' })
  contactName: string

  @Column({ name: 'contact_email' })
  contactEmail: string
}
