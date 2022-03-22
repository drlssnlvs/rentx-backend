import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCategoryUseCase from "./createCategoryUseCase";

export default class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const { name, description } = req.body;

    const category = await createCategoryUseCase.execute({
      name,
      description,
    });

    return res.status(201).json(category);
  }
}
