import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "L2qG5x7D9fJb3V@8eP9jT2mU!wX&3RzQ%1pHkL0Y6vN5oK4sJxA7eB@8yW2hS";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
