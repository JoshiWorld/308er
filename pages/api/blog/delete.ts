import type { NextApiRequest, NextApiResponse } from "next";
import { deleteBlog } from "lib/db/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { blogId } = req.query;

  if (!blogId || typeof blogId !== "string") {
    return res
      .status(400)
      .json({ message: "Blog ID is required and must be a string" });
  }

  try {
    const result = await deleteBlog(blogId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
