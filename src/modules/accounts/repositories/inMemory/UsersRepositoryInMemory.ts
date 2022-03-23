import { v4 as uuid } from "uuid";

import User from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";
import {
  ICreateUserDTO,
  IUpdateAvatar,
} from "@modules/accounts/dtos/ICreateUserDTO";

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    driverLicense,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      password,
      email,
      driverLicense,
    });

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
  async updateUserAvatar(
    userId: string,
    { avatarId, avatarSrc }: IUpdateAvatar
  ): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    user.avatarId = avatarId;
    user.avatarSrc = avatarSrc;
  }
}
