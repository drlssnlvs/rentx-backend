import { Router } from "express";

import CreateUserController from "../modules/accounts/useCases/createUser/createUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle);

export default userRouter;
