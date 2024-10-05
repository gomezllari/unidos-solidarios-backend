import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "secret-uni-ads";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};
