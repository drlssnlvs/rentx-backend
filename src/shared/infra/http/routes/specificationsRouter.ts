import CreateSpecificationController from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { Router } from "express";

import bearerAuth from "../middlewares/bearerAuth";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", bearerAuth, createSpecificationController.handle);

export default specificationRouter;
