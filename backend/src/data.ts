
export const foods: any[] = [
    {
      id: '1',
      name: 'Pizza',
      price: 10.99,
      tags: ['FastFood', 'Pizza', 'Lunch', 'SlowFood'],
      favorite: true,
      stars: 4.5,
      imageUrl: 'assets/images/pizza.jpg',
      origins: ['Italy'],
      cookTime: '20-30 minutes'
    },
    {
      id: '2',
      name: 'Sushi',
      price: 12.99,
      tags: ['Lunch', 'SlowFood'],
      favorite: false,
      stars: 4.8,
      imageUrl: 'assets/images/sushi.jpg',
      origins: ['Japan', 'East Asia', 'Tokyo'],
      cookTime: '10-15 minutes'
    },
    {
      id: '3',
      name: 'Burger',
      price: 8.99,
      tags: ['Hamburger', 'Fry', 'FastFood'],
      favorite: true,
      stars: 4.3,
      imageUrl: 'assets/images/burger.jpg',
      origins: ['USA'],
      cookTime: '15-20 minutes'
    },
    {
      id: '4',
      name: 'Pasta',
      price: 9.99,
      tags: ['Lunch', 'SlowFood'],
      favorite: false,
      stars: 4.1,
      imageUrl: 'assets/images/pastaa.jpg',
      origins: ['Italy'],
      cookTime: '25-30 minutes'
    },
    {
      id: '5',
      name: 'Tacos',
      price: 6.99,
      tags: ['Fry', 'FastFood', 'Lunch'],
      favorite: true,
      stars: 4.7,
      imageUrl: 'assets/images/tacos.jpg',
      origins: ['Mexico', 'Portugal'],
      cookTime: '10-15 minutes'
    },
    {
      id: '6',
      name: 'Salad',
      price: 5.99,
      tags: ['Healthy', 'Breakfast'],
      favorite: false,
      stars: 4.0,
      imageUrl: 'assets/images/salad.jpg',
      origins: ['Global'],
      cookTime: '5-10 minutes'
    }
  ];
  

export const tags: any[] = [
  { name: 'All', count: 6 },
  { name: 'FastFood', count: 4 },
  { name: 'Pizza', count: 2 },
  { name: 'Lunch', count: 3 },
  { name: 'SlowFood', count: 2 },
  { name: 'Hamburger', count: 1 },
  { name: 'Fry', count: 1 },
  { name: 'Breakfast', count: 1 },
  { name: 'Healthy', count: 1 }
]

export const users: any[] = [
  {
    name: 'Hassan',
    lastName: 'Lasheen',
    email: 'hassan.lashin@gmail.com',
    password: '123456',
    address: 'Cairo',
    isAdmin: true
  },
  {
    name: 'hussien',
    lastName: 'Lasheen',
    email: 'hussien.lasn@gmail.com',
    password: '123468',
    address: 'Alexandria',
    isAdmin: false
  },
]