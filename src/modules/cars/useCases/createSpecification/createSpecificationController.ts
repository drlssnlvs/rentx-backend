import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSpecificationUseCase from "./createSpecificationUseCase";

export default class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    const { name, description } = req.body;

    const specification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return res.status(201).json(specification);
  }
}
