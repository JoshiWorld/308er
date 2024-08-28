import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogs } from "lib/db/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const blogs = await getBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
