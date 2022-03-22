import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";

const specificationRouter = Router();

specificationRouter.post("/", (req, res) =>
  createSpecificationController().handle(req, res)
);

export default specificationRouter;
