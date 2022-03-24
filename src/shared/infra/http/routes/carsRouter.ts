import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/createCarController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";

import bearerAuth from "../middlewares/bearerAuth";
import adminAuth from "../middlewares/adminAuth";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRouter.post("/", bearerAuth, adminAuth, createCarController.handle);

carsRouter.get("/available", listAvailableCarsController.handle);

export default carsRouter;
