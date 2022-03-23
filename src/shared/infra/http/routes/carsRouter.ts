import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/createCarController";

import bearerAuth from "../middlewares/bearerAuth";
import adminAuth from "../middlewares/admInAuth";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/", bearerAuth, adminAuth, createCarController.handle);

export default carsRouter;
