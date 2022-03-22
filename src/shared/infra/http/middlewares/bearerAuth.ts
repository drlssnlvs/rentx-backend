import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

interface IDecodedToken {
  sub: string;
}

export const UNAUTHORIZED = {
  code: 401,
  msg: ["UNAUTHORIZED"],
};

export const FORBIDDEN = {
  code: 403,
  msg: ["FORBIDDEN"],
};

export default async function bearerAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res
      .status(UNAUTHORIZED.code)
      .json({ r: false, errors: UNAUTHORIZED.msg });
  }

  const [, token] = auth.split(" ");

  try {
    const { sub: id } = verify(token, process.env.PRIVATE_KEY) as IDecodedToken;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      return res
        .status(UNAUTHORIZED.code)
        .json({ r: false, errors: UNAUTHORIZED.msg });
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    return res.status(FORBIDDEN.code).json({ r: false, errors: FORBIDDEN.msg });
  }
}
