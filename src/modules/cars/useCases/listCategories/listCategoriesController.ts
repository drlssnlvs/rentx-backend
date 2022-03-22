import { Request, Response } from "express";
import ListCategoriesUseCase from "./listCategoriesUseCase";

export default class listCategoryController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const category = await this.listCategoriesUseCase.execute();

    return res.json(category);
  }
}
