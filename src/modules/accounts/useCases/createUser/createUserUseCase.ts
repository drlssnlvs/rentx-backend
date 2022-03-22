import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import User from "../../entities/User";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driverLicense,
  }: ICreateUserDTO): Promise<User | undefined> {
    const checkIfUserAlreadyRegister = await this.usersRepository.findByEmail(
      email
    );

    if (checkIfUserAlreadyRegister) {
      throw new Error("user already register");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driverLicense,
    });

    return user;
  }
}
