import { Router } from "express";

import CreateRentalController from "@modules/rentals/useCases/createRental/createRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";

import bearerAuth from "../middlewares/bearerAuth";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRouter.post("/", bearerAuth, createRentalController.handle);
rentalsRouter.post(
  "/give-back/:id",
  bearerAuth,
  devolutionRentalController.handle
);

export default rentalsRouter;
