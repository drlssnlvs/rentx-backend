import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import User from "../../entities/User";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

import BaseUseCase from "../../../../commons/BaseUseCase";

@injectable()
export default class CreateUserUseCase extends BaseUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    super();
  }

  async execute({
    name,
    password,
    email,
    driverLicense,
  }: ICreateUserDTO): Promise<User | boolean> {
    const checkIfUserAlreadyRegister = await this.usersRepository.findByEmail(
      email
    );

    if (checkIfUserAlreadyRegister) {
      return this.addError("user already register");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driverLicense,
    });

    delete user.password;

    return user;
  }
}
