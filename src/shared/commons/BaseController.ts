import { Response } from "express";

export default class BaseController {
  Ok(res: Response, result: any): void {
    res.status(200).send({
      r: true,
      data: result,
    });
  }

  BadRequest(res: Response, errors: any): void {
    res.locals.responseData = errors;

    res.status(400).send({
      r: false,
      errors,
    });
  }
}
