import { Request, Response } from "express";
import CreateCategoryUseCase from "./createCategoryUseCase";

export default class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const category = await this.createCategoryUseCase.execute({
      name,
      description,
    });

    return res.status(201).json(category);
  }
}
