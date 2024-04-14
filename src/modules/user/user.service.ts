import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  async createUser(params: { name: User[`name`]; email: User[`email`] }) {
    const { name, email } = params;
    const user = await this.repository.createUser({
      name,
      email,
    });
    return user;
  }

  async getUsers() {
    const users = await this.repository.users({});
    return users;
  }
}
