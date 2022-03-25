import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/createCarController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import CreateSpecificationToCarController from "@modules/cars/useCases/createSpecificationToCar/createSpecificationToCarController";
import CreateCarsImagesController from "@modules/cars/useCases/createCarsImages/createCarsImagesController";

import bearerAuth from "../middlewares/bearerAuth";
import adminAuth from "../middlewares/adminAuth";

import uploadConfig from "@config/uploadConfig";
import multer from "multer";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createSpecificationToCarController =
  new CreateSpecificationToCarController();
const createCarsImages = new CreateCarsImagesController();

const upload = multer(uploadConfig);

carsRouter.post("/", bearerAuth, adminAuth, createCarController.handle);

carsRouter.post(
  "/specifications/:carId",
  bearerAuth,
  adminAuth,
  createSpecificationToCarController.handle
);

carsRouter.post(
  "/images/:carId",
  bearerAuth,
  adminAuth,
  upload.array("images"),
  createCarsImages.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

export default carsRouter;
