import { Router } from "express";

import createCategoryController from "../modules/cars/useCases/createCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoryRouter = Router();

categoryRouter.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);

categoryRouter.get("/", (req, res) =>
  listCategoriesController.handle(req, res)
);

export default categoryRouter;
