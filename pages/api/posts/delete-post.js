import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { deleteImage } from "../../../lib/deleteImage";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const { id } = req.body;

  const { client, db } = await connectToDataBase();

  const post = await db.collection("posts").findOne({ _id: ObjectId(id) });

  if (post.image) {
    await deleteImage(res, `posts/${id}`);
  }

  await db.collection("posts").deleteOne({ _id: ObjectId(id) });

  const posts = await db.collection("posts").find().sort({ _id: -1 }).toArray();

  res.status(201).json({
    posts,
    message: "Post deleted",
  });
  await client.close();
};

export default handler;
