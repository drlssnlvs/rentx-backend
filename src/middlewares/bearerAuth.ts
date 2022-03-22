import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import UsersRepository from "../modules/accounts/repositories/implementatiosn/UsersRepository";

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

export default function bearerAuth(
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

    const user = usersRepository.findById(id);

    if (!user) {
      return res
        .status(UNAUTHORIZED.code)
        .json({ r: false, errors: UNAUTHORIZED.msg });
    }

    next();
  } catch (error) {
    return res.status(FORBIDDEN.code).json({ r: false, errors: FORBIDDEN.msg });
  }
}
