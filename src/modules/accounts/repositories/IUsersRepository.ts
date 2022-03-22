import { ICreateUserDTO, IUpdateAvatar } from "../dtos/ICreateUserDTO";
import User from "../entities/User";

export interface IUsersRepository {
  create({
    name,
    password,
    email,
    driverLicense,
  }: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  updateUserAvatar(userId: string, data: IUpdateAvatar): Promise<void>;
}
