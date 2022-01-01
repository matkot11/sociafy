import { MongoClient } from "mongodb";

export const connectToDataBase = async () => {
  return await MongoClient.connect(process.env.MONGODBAPI);
};
