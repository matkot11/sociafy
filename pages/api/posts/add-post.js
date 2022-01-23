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

  if (!session) {
    res.status(404).json({ message: "Could not authorize operation" });
    return;
  }

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

  if (!image && !text) {
    await client.close();
    res.status(404).json({ message: "Did not provide any data" });
    return;
  }

  let imageFile;

  if (image) {
    const { imageUrl } = await uploadImage(res, image, id, "posts");
    imageFile = imageUrl;
  }

  await db.collection("posts").insertOne({
    _id: id,
    userId: existingUser._id,
    email: session.user.email,
    profileImage: existingUser.profileImage,
    name: existingUser.name,
    image: image ? imageFile : null,
    text: text ? text : "",
    likes: [],
    comments: [],
  });

  res.status(201).json({ message: "Post created!" });
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
