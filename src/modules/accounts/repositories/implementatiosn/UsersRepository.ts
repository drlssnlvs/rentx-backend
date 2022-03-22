import { getRepository, Repository } from "typeorm";
import User from "../../entities/User";

import { IUsersRepository } from "../IUsersRepository";

import { IcreateUserDTO } from "../../dtos/ICreateUserDTO";

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({ email });

    return user;
  }

  async create({
    name,
    password,
    email,
    driverLicense,
  }: IcreateUserDTO): Promise<User> {
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
