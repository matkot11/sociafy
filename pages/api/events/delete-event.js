import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const { id } = req.body;

  const { client, db } = await connectToDataBase();

  await db.collection("events").deleteOne({ _id: ObjectId(id) });

  const events = await db
    .collection("events")
    .find()
    .sort({ date: 1 })
    .toArray();

  res.status(201).json({
    events,
    message: "Post deleted",
  });
  await client.close();
};

export default handler;
