import clientPromise from "lib/mongo";
import { ObjectId } from "mongodb";

const dbName = "308er";
const collectionName = "blogs";

type Blog = {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  image: string;
  userId: ObjectId;
};

async function createBlog(blog: Blog) {
  const client = await clientPromise;
  const db = client.db(dbName);

  if (typeof blog.userId === "string") {
    blog.userId = new ObjectId(blog.userId);
  }

  blog.createdAt = new Date();
  blog.updatedAt = new Date();

  const createdBlog = await db.collection(collectionName).insertOne(blog);

  return createdBlog;
}

async function getBlogs() {
  const client = await clientPromise;
  const db = client.db(dbName);

  const blogs = await db.collection(collectionName).find().toArray();

  return blogs;
}

async function getBlogById(blogId: string) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const blog = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(blogId) });

  return blog;
}

async function updateBlog(blogId: string, updatedBlog: Partial<Blog>) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(blogId) }, { $set: updatedBlog });

  return result;
}

async function deleteBlog(blogId: string) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(blogId) });

  return result;
}

export { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById };
