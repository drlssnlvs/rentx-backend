import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./createUserUseCase";

import BaseController from "../../../../commons/BaseController";

export default class CreateUserController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { name, password, email, driverLicense } = req.body;

    const result = await useCase.execute({
      name,
      password,
      email,
      driverLicense,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
