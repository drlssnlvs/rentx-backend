import { Router } from "express";

import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";
import importCategoryController from "../modules/cars/useCases/importCategory";
import uploadConfig from "../config/uploadConfig";

const categoryRouter = Router();

const upload = multer(uploadConfig);

categoryRouter.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);

categoryRouter.get("/", (req, res) =>
  listCategoriesController.handle(req, res)
);

categoryRouter.post("/import", upload.single("file"), async (req, res) => {
  await importCategoryController.handle(req, res);
});

export default categoryRouter;
