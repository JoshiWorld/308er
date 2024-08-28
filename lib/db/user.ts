import clientPromise from "lib/mongo";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const dbName = "308er";
const collectionName = "users";

type User = {
  username: string;
  password: string;
  name: string;
  image: string;
};

async function createUser(user: User) {
  const client = await clientPromise;
  const db = client.db(dbName);

  if (!process.env.SALT_ROUNDS) return;

  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;

  const createdUser = await db.collection(collectionName).insertOne(user);

  return createdUser;
}

async function getUsers() {
  const client = await clientPromise;
  const db = client.db(dbName);

  const users = await db.collection(collectionName).find().toArray();

  return users;
}

async function getUserById(userId: string) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const user = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectId(userId) });

  return user;
}

async function getUserByUsername(username: string) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const user = await db
    .collection(collectionName)
    .findOne({ username: username });

  return user;
}

async function updateUser(userId: string, updatedUser: Partial<User>) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser });

  return result;
}

async function deleteUser(userId: string) {
  const client = await clientPromise;
  const db = client.db(dbName);

  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(userId) });

  return result;
}

export { createUser, getUsers, updateUser, deleteUser, getUserById, getUserByUsername };
