import { Request, Response } from "express";
import CreateSpecificationUseCase from "./createSpecificationUseCase";

export default class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const specification = await this.createSpecificationUseCase.execute({
      name,
      description,
    });

    return res.status(201).json(specification);
  }
}
