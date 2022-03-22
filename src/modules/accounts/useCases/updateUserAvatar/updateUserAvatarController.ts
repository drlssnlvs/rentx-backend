import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./updateUserAvatarUseCase";

import BaseController from "../../../../commons/BaseController";

export default class UpdateUserAvatarController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { id } = req.user;

    const result = await useCase.execute(id, req.file);

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
