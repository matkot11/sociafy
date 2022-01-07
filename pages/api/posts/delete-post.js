import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const { id } = req.body;

  const { client, db } = await connectToDataBase();

  await db.collection("posts").deleteOne({ _id: ObjectId(id) });

  const posts = await db.collection("posts").find().sort({ _id: -1 }).toArray();

  res.status(201).json({
    posts,
    message: "Post deleted",
  });
  await client.close();
};

export default handler;
