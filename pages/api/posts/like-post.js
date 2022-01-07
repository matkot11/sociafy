import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { getAndCheckSession } from "../../../lib/getAndCheckSession";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const { id } = req.body;

  const session = await getAndCheckSession(req, res);

  const { client, db } = await connectToDataBase();

  const post = await db.collection("posts").findOne({ _id: ObjectId(id) });
  let likes = await post.likes;
  if (post.likes.includes(session.user.email)) {
    await db.collection("posts").updateOne(
      { _id: ObjectId(id) },
      {
        $pull: {
          likes: session.user.email,
        },
      },
    );
    const index = likes.indexOf(session.user.email);
    if (index > -1) {
      likes.splice(index, 1);
    }
  } else {
    await db.collection("posts").updateOne(
      { _id: ObjectId(id) },
      {
        $push: {
          likes: session.user.email,
        },
      },
    );
    likes.push(session.user.email);
  }
  res.status(201).json({
    likes,
    message: "Like added",
  });
  await client.close();
};
export default handler;
