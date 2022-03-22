import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./createSpecificationUseCase";

import BaseController from "../../../../commons/BaseController";

export default class CreateSpecificationController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { name, description } = req.body;

    const result = await useCase.execute({
      name,
      description,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
