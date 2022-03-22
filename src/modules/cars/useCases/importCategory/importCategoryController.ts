import "reflect-metadata"

import { Request, Response } from "express";
import { container } from "tsyringe";
import ImporCategoryUseCase from "./importCategoryUseCase";

export default class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const importCategoryUseCase = container.resolve(ImporCategoryUseCase);

    const { file } = req;

    await importCategoryUseCase.execute(file);

    return res.status(201).json();
  }
}
