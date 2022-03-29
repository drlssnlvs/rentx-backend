import BaseController from "@shared/commons/BaseController";

import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./createRentalUseCase";

export default class CreateRentalController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { carId, expectReturnDate } = req.body;

    const { id: userId } = req.user;

    const result = await useCase.execute({
      carId,
      expectReturnDate: new Date(expectReturnDate),
      userId,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
