import { Request, Response } from "express";
import { container } from "tsyringe";
import ListCategoriesUseCase from "./listCategoriesUseCase";

export default class listCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const category = await listCategoriesUseCase.execute();

    return res.json(category);
  }
}
