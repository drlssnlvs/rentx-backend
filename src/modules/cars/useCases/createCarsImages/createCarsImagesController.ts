import { Request, Response } from "express";
import BaseController from "@shared/commons/BaseController";
import { container } from "tsyringe";
import UseCase from "./createCarsImagesUseCase";
import { IFiles } from "@modules/cars/dtos/ICreateCarsImagesDTO";

export default class CreateCarsImagesController extends BaseController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const useCase = container.resolve(UseCase);

    const { carId } = req.params;

    const images = req.files as IFiles[];

    const result = await useCase.execute({
      carId,
      images,
    });

    if (useCase.isValid()) {
      return this.Ok(res, result);
    }

    return this.BadRequest(res, useCase.errors);
  };
}
