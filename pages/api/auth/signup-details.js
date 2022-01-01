import cloudinary from "cloudinary";
import { connectToDataBase } from "../../../lib/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { file, fullName, birthday } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.status(404).json({ message: "No session" });
    return;
  }

  const client = await connectToDataBase();

  const db = client.db();

  const existingUser = await db
    .collection("users")
    .findOne({ email: session.user.email });

  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

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

  if (fullName && birthday) {
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            fullName: fullName,
            birthday: birthday,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Data did not upload correctly" });
      await client.close();
    }
  }

  if (fullName) {
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            fullName: fullName,
          },
        },
      );
    } catch (e) {
      res.status(404).json({ message: "Full name did not upload correctly" });
      await client.close();
    }
  }

  if (birthday) {
    try {
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            birthday: birthday,
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
