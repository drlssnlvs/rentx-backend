import BaseController from "@shared/commons/BaseController";

import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./createSpecificationToCarUseCase";

export default class CreateSpecificationController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { carId } = req.params;
    const { specificationsId } = req.body;

    const result = await useCase.execute(carId, specificationsId);

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
