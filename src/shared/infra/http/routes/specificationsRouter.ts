import CreateSpecificationController from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { Router } from "express";

import bearerAuth from "../middlewares/bearerAuth";
import adminAuth from "../middlewares/adminAuth";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post(
  "/",
  bearerAuth,
  adminAuth,
  createSpecificationController.handle
);

export default specificationRouter;
