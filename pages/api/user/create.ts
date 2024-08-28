import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUserByUsername } from "lib/db/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password, name, image } = req.body;

  if (!username || !password || !name) {
    return res
      .status(400)
      .json({ message: "Username, password, and name are required" });
  }

  try {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Benutzer erstellen
    const newUser = {
      username,
      password,
      name,
      image: image || "",
    };

    const result = await createUser(newUser);

    // @ts-expect-error || @ts-ignore
    return res.status(201).json({ userId: result.insertedId });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
