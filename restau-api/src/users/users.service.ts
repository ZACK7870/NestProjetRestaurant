import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { User } from '../common/interfaces/user.interface';
import { Role } from '../auth/role.enum';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    // J'attribue le role user par défaut
    const user: User = {
      id: Date.now(),
      ...createUserDto,
      roles: [Role.USER],
    };

    // Mais si à la place d'un num c'est un string 'admin', je lui attribue le role admin, on s'en fout de la sécurité
    if (createUserDto.phoneNumber === 'admin') {
      user.roles = [Role.ADMIN];
    }

    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findByPhone(phoneNumber: string): Promise<User | null> {
    const found = this.users.find((user) => user.phoneNumber === phoneNumber);
    return found || null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return this.users[userIndex];
    }
    return null;
  }

  async remove(id: number): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      const removedUsers = this.users.splice(userIndex, 1);
      return removedUsers[0];
    }
    return null;
  }
}
