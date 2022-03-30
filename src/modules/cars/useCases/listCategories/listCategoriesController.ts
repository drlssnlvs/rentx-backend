import BaseController from "@shared/commons/BaseController";
import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./listCategoriesUseCase";

export default class listCategoryController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const result = await useCase.execute();

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }
  };
}
