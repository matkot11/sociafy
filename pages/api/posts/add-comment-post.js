import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const { id, comment, email } = req.body;

  const { client, db } = await connectToDataBase();

  const user = await db.collection("users").findOne({ email });

  const commentId = new ObjectId();

  await db.collection("posts").updateOne(
    { _id: ObjectId(id) },
    {
      $push: {
        comments: {
          id: commentId.toString(),
          email,
          name: user.name,
          comment,
        },
      },
    },
  );

  const post = await db.collection("posts").findOne({ _id: ObjectId(id) });

  res.status(201).json({
    comments: post.comments,
    message: "Comment added",
  });
  await client.close();
};
export default handler;
