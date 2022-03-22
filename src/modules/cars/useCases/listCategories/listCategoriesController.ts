import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./listCategoriesUseCase";

import BaseController from "../../../../commons/BaseController";

export default class listCategoryController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const result = await useCase.execute();

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
