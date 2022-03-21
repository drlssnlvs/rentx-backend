import { Router } from "express";

import CategoryRepository from "../repositories/categoriesRepository";

const categoryRouter = Router();
const categoryRepository = new CategoryRepository();

categoryRouter.post("/", (req, res) => {
  const { name, description } = req.body;

  const checkIfCategoryAlreadyRegister =
    categoryRepository.findCategoryByName(name);

  if (checkIfCategoryAlreadyRegister) {
    return res.json({ msg: "category already register" });
  }

  const category = categoryRepository.create({ name, description });

  return res.status(201).json(category);
});

categoryRouter.get("/", (req, res) => {
  const categories = categoryRepository.list();

  return res.json(categories);
});

export default categoryRouter;
