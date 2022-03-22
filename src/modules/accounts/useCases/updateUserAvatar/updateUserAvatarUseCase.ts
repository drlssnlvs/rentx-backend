import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

import BaseUseCase from "../../../../commons/BaseUseCase";

import { files } from '../../../../commons/constants'
 
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

    const { avatarSrc } = await this.usersRepository.findById(userId)

    if(avatarSrc) {
      files.delete(avatarSrc)
    }

    const avatar = {
      avatarId: filename,
      avatarSrc: path,
    };

    await this.usersRepository.updateUserAvatar(userId, avatar)

    return true;
  }
}
