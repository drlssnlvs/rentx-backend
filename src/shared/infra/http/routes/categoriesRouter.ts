import uploadConfig from "@config/uploadConfig";
import CreateCategoryController from "@modules/cars/useCases/createCategory/createCategoryController";
import listCategoryController from "@modules/cars/useCases/listCategories/listCategoriesController";
import ImportCategoryController from "@modules/cars/useCases/importCategory/importCategoryController";
import { Router } from "express";

import bearerAuth from "../middlewares/bearerAuth";
import adminAuth from "../middlewares/adminAuth";

import multer from "multer";

const categoryRouter = Router();

const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new listCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRouter.post(
  "/",
  bearerAuth,
  adminAuth,
  createCategoryController.handle
);

categoryRouter.get("/", bearerAuth, adminAuth, listCategoriesController.handle);

categoryRouter.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export default categoryRouter;
