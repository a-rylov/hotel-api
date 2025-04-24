import { DataSource } from 'typeorm';
import { Room } from './room.entity';

export async function seedRooms(dataSource: DataSource) {
  const roomRepo = dataSource.getRepository(Room);

  const rooms = [
    {
      id: 1,
      title: 'Комфорт с видом на город',
      description: 'Уютный номер с одной двуспальной кроватью, отличным видом и всеми удобствами.',
      price: 4500,
      capacity: 2,
      bedType: 'двуспальная',
      images: [
        'https://hotel-spb.ru/assets/components/phpthumbof/cache/room-deluxe_001.52f4436743375e772a99cbd9955f2378.jpg',
        'https://hotel-spb.ru/assets/components/phpthumbof/cache/room-deluxe_003.52f4436743375e772a99cbd9955f2378.jpg',
        'https://hotel-spb.ru/assets/components/phpthumbof/cache/room-deluxe_007.52f4436743375e772a99cbd9955f2378.jpg'
      ],
      availableDates: []
    },
    {
      id: 2,
      title: 'Семейный номер',
      description: 'Просторный номер для всей семьи, с двумя односпальными и одной двуспальной кроватью.',
      price: 6200,
      capacity: 4,
      bedType: 'смешанный',
      images: [
        'https://maghotel-vityazevo.ru/images/sampledata/rooms/standart6/01st6_1.jpg',
        'https://maghotel-vityazevo.ru/images/sampledata/rooms/standart6/01st6_2.jpg',
        'https://maghotel-vityazevo.ru/images/sampledata/rooms/standart6/01st6_4.jpg',
        'https://maghotel-vityazevo.ru/images/sampledata/rooms/standart6/01st6_6.jpg'
      ],
      availableDates: []
    },
    {
      id: 3,
      title: 'Эконом одноместный',
      description: 'Простой номер для одного человека. Идеально подойдёт для краткой командировки.',
      price: 2700,
      capacity: 1,
      bedType: 'односпальная',
      images: [
        'https://hotel-spb.ru/assets/components/phpthumbof/cache/room-standart_07.52f4436743375e772a99cbd9955f2378.jpg'
      ],
      availableDates: []
    }
  ];

  const exists = await roomRepo.count();
  if (exists === 0) {
    await roomRepo.save(rooms);
    console.log('✅ Rooms seeded!');
  } else {
    console.log('⚠️ Rooms already seeded.');
  }
}