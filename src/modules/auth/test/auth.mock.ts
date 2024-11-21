import { Role } from '@prisma/client';
import { UserWithPassword, UserWithoutPassword } from './auth.types';

export const mockDate = new Date();

export const mockUser: UserWithPassword = {
  id: '1',
  email: 'test@test.com',
  name: 'Test User',
  password: 'hashedPassword',
  role: Role.USER,
  createdAt: mockDate,
  updatedAt: mockDate,
};

export const mockUserWithoutPassword: UserWithoutPassword = {
  id: '1',
  email: 'test@test.com',
  name: 'Test User',
  role: Role.USER,
  createdAt: mockDate,
  updatedAt: mockDate,
};
