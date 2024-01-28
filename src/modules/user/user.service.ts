import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  async createUser(params: { name: User[`name`] }) {
    const { name } = params;
    const user = await this.repository.createUser({
      name,
    });
    return user;
  }

  async getUsers() {
    const users = await this.repository.users({});
    return users;
  }
}
