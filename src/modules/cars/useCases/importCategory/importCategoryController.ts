import "reflect-metadata";

import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./importCategoryUseCase";

import BaseController from "../../../../commons/BaseController";

export default class CreateSpecificationController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { file } = req;

    const result = await useCase.execute(file);

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
