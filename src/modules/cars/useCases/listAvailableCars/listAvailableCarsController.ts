import BaseController from "@shared/commons/BaseController";
import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./listAvailableCarsUseCase";

export default class ListAvailableCarsController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const { brand, name, categoryId } = req.query;

    const useCase = container.resolve(UseCase);

    const result = await useCase.execute({
      name: name as string,
      brand: brand as string,
      categoryId: categoryId as string,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
