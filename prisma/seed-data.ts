import { Role } from '@prisma/client';

export const users = [
  {
    email: 'admin@example.com',
    password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    name: 'Admin User',
    role: Role.ADMIN,
  },
  {
    email: 'user@example.com',
    password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    name: 'Regular User',
    role: Role.USER,
  },
];

export const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Home & Garden' },
  { name: 'Sports' },
];

export const products = [
  {
    name: 'Smartphone XYZ',
    description: 'Latest smartphone with amazing features',
    price: 999.99,
    stock: 50,
    images: ['phone1.jpg', 'phone2.jpg'],
    categoryName: 'Electronics',
  },
  {
    name: 'Laptop Pro',
    description: 'Powerful laptop for professionals',
    price: 1499.99,
    stock: 30,
    images: ['laptop1.jpg', 'laptop2.jpg'],
    categoryName: 'Electronics',
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 29.99,
    stock: 100,
    images: ['tshirt1.jpg'],
    categoryName: 'Clothing',
  },
  {
    name: 'JavaScript Guide',
    description: 'Complete guide to modern JavaScript',
    price: 39.99,
    stock: 75,
    images: ['book1.jpg'],
    categoryName: 'Books',
  },
];
