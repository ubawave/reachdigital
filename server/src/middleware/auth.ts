import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    req.user = verifyToken(header.slice(7));
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
