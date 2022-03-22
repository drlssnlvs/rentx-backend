import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./createSessionUseCase";

import BaseController from "../../../../commons/BaseController";

export default class CreateSessionController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { email, password } = req.body;

    const result = await useCase.execute({
      email,
      password,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
