import { MongoClient } from "mongodb";

export const connectToDataBase = async () => {
  const client = await MongoClient.connect(process.env.MONGODBAPI);

  const db = client.db();

  return {
    client,
    db,
  };
};
