import { inject, injectable } from "tsyringe";
import User from "../../entities/User";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IcreateUserDTO } from "../../dtos/ICreateUserDTO";

import { encrypt } from "../../../../commons/constants";

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
  }: IcreateUserDTO): Promise<User | undefined> {
    const checkIfUserAlreadyRegister = await this.usersRepository.findByEmail(
      email
    );

    if (checkIfUserAlreadyRegister) {
      throw new Error("user already register");
    }

    const hashedPassword = encrypt(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driverLicense,
    });

    return user;
  }
}
