import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSessionUseCase from "./createSessionUseCase";

export default class CreateSessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const { email, password } = req.body;

    const { user, token } = await createSessionUseCase.execute({
      email,
      password,
    });

    return res.status(201).json({ user, token });
  }
}
