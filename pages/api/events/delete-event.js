import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { deleteImage } from "../../../lib/deleteImage";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const { id } = req.body;

  const { client, db } = await connectToDataBase();

  await deleteImage(res, `events/${id}`);

  await db.collection("events").deleteOne({ _id: ObjectId(id) });

  const events = await db
    .collection("events")
    .find()
    .sort({ date: 1 })
    .toArray();

  await client.close();

  res.status(201).json({
    events,
    message: "Post deleted",
  });
};

export default handler;
