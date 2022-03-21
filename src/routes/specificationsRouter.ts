import { Router } from "express";

import SpecificationRepository from "../modules/cars/repositories/specificationsRepository";

import CreateSpecificationService from "../modules/cars/services/createSpecificationService";

const specificationRouter = Router();
const specificationRepository = new SpecificationRepository();

specificationRouter.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  const specification = createSpecificationService.execute({
    name,
    description,
  });

  return res.status(201).json(specification);
});

export default specificationRouter;
