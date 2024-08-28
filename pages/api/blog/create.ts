import type { NextApiRequest, NextApiResponse } from "next";
import { createBlog } from "lib/db/blog";
import { verifyJwtToken } from "lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const decodedToken = verifyJwtToken(req, res);

  if (!decodedToken) {
    return;
  }

  try {
    const blog = await createBlog({
      ...req.body,
      // @ts-expect-error || @ts-ignore
      userId: decodedToken.userId,
    });
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}