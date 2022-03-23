import BaseController from "@shared/commons/BaseController";

import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./createCarUseCase";

export default class CreateCarController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    } = req.body;

    const result = await useCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
