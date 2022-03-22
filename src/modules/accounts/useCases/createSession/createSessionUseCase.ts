import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import BaseUseCase from "@shared/commons/BaseUseCase";
import User from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateSessionDTO } from "../../dtos/ICreateUserDTO";

@injectable()
export default class CreateUserUseCase extends BaseUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    super();
  }

  async execute({
    password,
    email,
  }: ICreateSessionDTO): Promise<{ user: User; token: string } | boolean> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return this.addError("pass/user incorrect");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      return this.addError("pass/user incorrect");
    }

    const token = sign({}, process.env.PRIVATE_KEY, {
      expiresIn: "12h",
      subject: user.id,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}
