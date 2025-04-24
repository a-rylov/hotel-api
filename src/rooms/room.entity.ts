import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Booking } from '../bookings/booking.entity'

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  description: string

  @Column('int')
  price: number

  @Column('int')
  capacity: number

  @Column({ name: 'bed_type' })
  bedType: string

  @Column('text', { array: true, nullable: true })
  images: string[]

  @OneToMany(() => Booking, booking => booking.room, { cascade: true })
  bookings: Booking[]
}
