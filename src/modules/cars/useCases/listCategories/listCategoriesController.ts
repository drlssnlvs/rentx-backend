import { Request, Response } from "express";
import ListCategoriesUseCase from "./listCategoriesUseCase";

export default class listCategoryController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const category = this.listCategoriesUseCase.execute();

    return res.json(category);
  }
}
