import BaseController from "@shared/commons/BaseController";

import { Request, Response } from "express";
import { container } from "tsyringe";

import UseCase from "./devolutionRentalUseCase";

export default class DevolutionRentalController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { id: rentalId } = req.params;

    const { id: userId } = req.user;

    const result = await useCase.execute({
      rentalId,
      userId,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
