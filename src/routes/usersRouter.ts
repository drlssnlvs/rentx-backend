import multer from "multer";
import { Router } from "express";

import uploadConfig from "../config/uploadConfig";

import CreateUserController from "../modules/accounts/useCases/createUser/createUserController";
import UpdateUserAvatarController from "../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";

import bearerAuth from "../middlewares/bearerAuth";

const userRouter = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRouter.post("/", createUserController.handle);

userRouter.patch(
  "/avatar",
  bearerAuth,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export default userRouter;
