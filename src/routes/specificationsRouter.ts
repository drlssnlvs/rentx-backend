import { Router } from "express";

import CreateSpecificationController from "../modules/cars/useCases/createSpecification/createSpecificationController";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", createSpecificationController.handle);

export default specificationRouter;
