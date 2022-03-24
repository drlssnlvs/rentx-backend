import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/createCarController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import CreateSpecificationToCarController from "@modules/cars/useCases/createSpecificationToCar/createSpecificationToCarController";

import bearerAuth from "../middlewares/bearerAuth";
import adminAuth from "../middlewares/adminAuth";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createSpecificationToCarController =
  new CreateSpecificationToCarController();

carsRouter.post("/", bearerAuth, adminAuth, createCarController.handle);

carsRouter.post(
  "/specifications/:carId",
  bearerAuth,
  adminAuth,
  createSpecificationToCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

export default carsRouter;
