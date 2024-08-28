import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.JWT_SECRET as string;

export function verifyJwtToken(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    return decoded; // Gibt die decoded payload zurück, die z.B. die userId enthält
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
