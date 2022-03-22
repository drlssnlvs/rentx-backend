import CreateSessionController from "@modules/accounts/useCases/createSession/createSessionController";
import { Router } from "express";

const sessionRouter = Router();

const createSessionController = new CreateSessionController();

sessionRouter.post("/", createSessionController.handle);

export default sessionRouter;
