import cloudinary from "cloudinary";
import { connectToDataBase } from "../../../lib/db";
import { getSession } from "next-auth/react";
import { getAndCheckSession } from "../../../lib/getAndCheckSession";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { file, name, birthday } = req.body;

  const session = await getAndCheckSession(req, res);

  const { existingUser, client, db } = await connectToDataBase(res, "users", {
    email: session.user.email,
  });

  if (file) {
    let imageUrl = "";

    await cloudinary.v2.uploader
      .upload(file, {
        resource_type: "image",
        public_id: `users/${existingUser._id.toString()}`,
        use_filename: true,
        filename_override: existingUser._id.toString(),
      })
      .then((response) => (imageUrl = response.url))
      .catch((e) =>
        res
          .status(404)
          .json({ message: "Profile image did not upload correctly" }),
      );

    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            profileImage: imageUrl,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Data did not upload correctly" });
      await client.close();
    }
  }

  if (name && birthday) {
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

  if (name) {
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

  if (birthday) {
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

  res.status(200).json({ message: "User created!" });

  await client.close();
};

export default handler;
