import cloudinary from "cloudinary";
import { connectToDataBase } from "../../../lib/db";
import { getAndCheckSession } from "../../../lib/getAndCheckSession";
import { uploadImage } from "../../../lib/uploadImage";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const { file, name, birthday } = req.body;

  const session = await getAndCheckSession(req, res);

  const { client, db } = await connectToDataBase();

  const existingUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (file && name && birthday) {
    const { imageUrl } = await uploadImage(
      res,
      file,
      existingUser._id.toString(),
      "users",
    );
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            profileImage: imageUrl,
            name,
            birthday,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Data did not upload correctly" });
      await client.close();
    }
  }

  if (file && name && !birthday) {
    const { imageUrl } = await uploadImage(
      res,
      file,
      existingUser._id.toString(),
      "users",
    );
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            profileImage: imageUrl,
            name,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Data did not upload correctly" });
      await client.close();
    }
  }

  if (file && birthday && !name) {
    const { imageUrl } = await uploadImage(
      res,
      file,
      existingUser._id.toString(),
      "users",
    );
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            profileImage: imageUrl,
            birthday,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Data did not upload correctly" });
      await client.close();
    }
  }

  if (name && birthday && !file) {
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            name,
            birthday,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Data did not upload correctly" });
      await client.close();
    }
  }

  if (name && !birthday && !file) {
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            name,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Name did not upload correctly" });
      await client.close();
    }
  }

  if (birthday && !name && !file) {
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            birthday,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Birthday did not upload correctly" });
      await client.close();
    }
  }

  if (!birthday && !name && !file) {
    res.status(404).json({ message: "Did not provide any data" });
    await client.close();
  }

  res.status(200).json({ message: "User created!" });

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
