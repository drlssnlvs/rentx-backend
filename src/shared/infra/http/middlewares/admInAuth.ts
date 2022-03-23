import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { Response, Request, NextFunction } from "express";

import { errors } from "@shared/commons/constants";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export default async function bearerAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    return res.status(errors.FORBIDDEN.code).json(errors.FORBIDDEN.msg);
  }

  next();
}
