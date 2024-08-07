import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
