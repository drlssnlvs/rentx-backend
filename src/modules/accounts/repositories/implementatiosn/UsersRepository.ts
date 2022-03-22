import { getRepository, Repository } from "typeorm";
import User from "../../entities/User";

import { IUsersRepository } from "../IUsersRepository";

import { ICreateUserDTO, IUpdateAvatar } from "../../dtos/ICreateUserDTO";

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async updateUserAvatar(
    userId: string,
    { avatarId, avatarSrc }: IUpdateAvatar
  ): Promise<void> {
    await this.repository.update({ id: userId }, { avatarId, avatarSrc });
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({
    name,
    password,
    email,
    driverLicense,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      password,
      email,
      driverLicense,
    });

    await this.repository.save(user);

    return user;
  }
}
