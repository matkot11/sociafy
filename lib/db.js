import { MongoClient } from "mongodb";

export const connectToDataBase = async (res, collectionName, filter) => {
  const client = await MongoClient.connect(process.env.MONGODBAPI);

  const db = client.db();

  const existingUser = await db.collection(collectionName).findOne(filter);

  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }
  return { existingUser, client, db };
};
