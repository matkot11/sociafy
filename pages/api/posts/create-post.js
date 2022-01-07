import { ObjectId } from "mongodb";
import { connectToDataBase } from "../../../lib/db";
import { getAndCheckSession } from "../../../lib/getAndCheckSession";
import { uploadImage } from "../../../lib/uploadImage";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { text, image } = req.body;

  const session = await getAndCheckSession(req, res);

  const { client, db } = await connectToDataBase();

  const existingUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

  const id = new ObjectId();

  if (text && image) {
    const { imageUrl } = await uploadImage(res, image, id, "posts");

    await db.collection("posts").insertOne({
      _id: id,
      email: session.user.email,
      profileImage: existingUser.profileImage,
      name: existingUser.name,
      image: imageUrl,
      text,
      likes: [],
      comments: [],
    });

    res.status(201).json({ message: "Post created!" });
    await client.close();
  }

  if (text && !image) {
    await db.collection("posts").insertOne({
      _id: id,
      email: session.user.email,
      profileImage: existingUser.profileImage,
      name: existingUser.name,
      image: null,
      text,
      likes: [],
      comments: [],
    });

    res.status(201).json({ message: "Post created!" });
    await client.close();
  }

  if (image && !text) {
    const { imageUrl } = await uploadImage(res, image, id, "posts");

    await db.collection("posts").insertOne({
      _id: id,
      email: session.user.email,
      profileImage: existingUser.profileImage,
      name: existingUser.name,
      image: imageUrl,
      text: "",
      likes: [],
      comments: [],
    });

    res.status(201).json({ message: "Post created!" });
    await client.close();
  }

  res.status(404).json({ message: "Did not provide any data" });
  await client.close();
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default handler;
