import { Request, Response } from "express";
import ImporCategoryUseCase from "./importCategoryUseCase";

export default class CreateSpecificationController {
  constructor(private importCategoryUseCase: ImporCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    await this.importCategoryUseCase.execute(file);

    return res.status(201).json();
  }
}
