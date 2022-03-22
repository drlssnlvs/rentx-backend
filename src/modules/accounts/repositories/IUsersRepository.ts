import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import User from "../entities/User";

export interface IUsersRepository {
  create({
    name,
    password,
    email,
    driverLicense,
  }: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
}
