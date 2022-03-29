import { Router } from "express";

import CreateRentalController from "@modules/rentals/useCases/createRental/createRentalController";

import bearerAuth from "../middlewares/bearerAuth";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();

rentalsRouter.post("/", bearerAuth, createRentalController.handle);

export default rentalsRouter;
