import { Router } from "express";

import multer from "multer";

import ImportCategoryController from "../modules/cars/useCases/importCategory/importCategoryController";
import uploadConfig from "../config/uploadConfig";

import CreateCategoryController from "../modules/cars/useCases/createCategory/createCategoryController";
import ListCategoryController from "../modules/cars/useCases/listCategories/listCategoriesController";

const categoryRouter = Router();

const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRouter.post("/", createCategoryController.handle);

categoryRouter.get("/", listCategoriesController.handle);

categoryRouter.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export default categoryRouter;
