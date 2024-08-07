import { Request, Response } from "express";

export default class MiddlewareController {
  static async test(req: Request, res: Response): Promise<void> {
    res.status(201).json(res.locals.user?.email);
  }
}
