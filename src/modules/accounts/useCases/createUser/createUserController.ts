import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserUseCase from "./createUserUseCase";

export default class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, password, email, driverLicense } = req.body;

    const category = await createUserUseCase.execute({
      name,
      password,
      email,
      driverLicense,
    });

    delete category?.password;

    return res.status(201).json(category);
  }
}
