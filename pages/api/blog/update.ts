import type { NextApiRequest, NextApiResponse } from "next";
import { updateBlog } from "lib/db/blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { blogId, ...updatedBlog } = req.body;

  if (!blogId) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    const result = await updateBlog(blogId, updatedBlog);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Blog not found or not updated" });
    }

    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
