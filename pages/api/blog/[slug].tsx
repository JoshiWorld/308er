import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogById } from "lib/db/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slug: blogId } = req.query;

  if (!blogId || typeof blogId !== "string") {
    return res
      .status(400)
      .json({ message: "Blog ID is required and must be a string" });
  }

  try {
    const blog = await getBlogById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
