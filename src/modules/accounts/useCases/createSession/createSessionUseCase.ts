import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import User from "../../entities/User";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateSessionDTO } from "../../dtos/ICreateUserDTO";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    password,
    email,
  }: ICreateSessionDTO): Promise<{ user: User; token: string } | undefined> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("pass/user incorrect");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new Error("pass/user incorrect");
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
