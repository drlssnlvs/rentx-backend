import { Router } from "express";

import CreateSessionController from "../modules/accounts/useCases/createSession/createSessionController";

const sessionRouter = Router();

const createSessionController = new CreateSessionController();

sessionRouter.post("/", createSessionController.handle);

export default sessionRouter;
