import { Router } from "express";

import CategoryRepository from "../repositories/categoriesRepository";

import CreateCategoryService from "../services/createCategoryService";

const categoryRouter = Router();
const categoryRepository = new CategoryRepository();

categoryRouter.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);

  const category = createCategoryService.execute({ name, description });

  return res.status(201).json(category);
});

categoryRouter.get("/", (req, res) => {
  const categories = categoryRepository.list();

  return res.json(categories);
});

export default categoryRouter;
