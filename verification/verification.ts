import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secretKey = "your-secret-key"; // Dovresti usare una chiave segreta sicura in un ambiente di produzione.

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (req.url == "/login"||req.url == "/user/register") {
    next();
  } else if (!token) {
    return res.status(403).json({ message: "Token mancante" });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token non valido" });
      }
      //  decoded  { username: 'utente', iat: 1698479688, exp: 1698483288 }
      next();
    });
  }
}

export function sign(username: string): string {
  return jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  
}
