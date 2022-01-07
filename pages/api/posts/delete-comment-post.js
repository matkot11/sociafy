import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const { comment, postId } = req.body;

  const { client, db } = await connectToDataBase();

  const post = await db.collection("posts").findOne({ _id: ObjectId(postId) });
  const filteredComments = await post.comments.filter(
    (com) => com.id !== comment.id,
  );

  await db.collection("posts").updateOne(
    { _id: ObjectId(postId) },
    {
      $set: {
        comments: filteredComments,
      },
    },
  );

  res.status(201).json({
    comments: filteredComments,
    message: "Comment deleted",
  });
  await client.close();
};

export default handler;
