// src/services/UserService.ts
import { UserRepository } from '../repositories/UserRepository';
import { Usuario } from '@prisma/client';

class UserService {
  static async getAllUsers(): Promise<Usuario[]> {
    return UserRepository.getAllUsers();
  }

  static async createUser(userData: Omit<Usuario, 'id'>): Promise<Usuario> {
    return UserRepository.createUser(userData);
  }

  static async getUserById(id: number): Promise<Usuario> {
    const user = await UserRepository.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default UserService;
