import { inject, injectable } from "tsyringe";

import BaseUseCase from "@shared/commons/BaseUseCase";
import { files } from "@shared/commons/constants";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export default class UpdateUserAvatarUseCase extends BaseUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    super();
  }

  async execute(userId: string, file: Express.Multer.File): Promise<boolean> {
    const { filename, path } = file;

    const { avatarSrc } = await this.usersRepository.findById(userId);

    if (avatarSrc) {
      files.delete(avatarSrc);
    }

    const avatar = {
      avatarId: filename,
      avatarSrc: path,
    };

    await this.usersRepository.updateUserAvatar(userId, avatar);

    return true;
  }
}
