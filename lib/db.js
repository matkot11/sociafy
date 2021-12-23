import { MongoClient } from "mongodb";

export const connectToDataBase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://matkot11:1YIlCrQyz2WmoxN2@cluster0.bf2g6.mongodb.net/auth?retryWrites=true&w=majority",
  );
};
