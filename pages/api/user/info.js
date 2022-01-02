import { getSession } from "next-auth/react";
import { connectToDataBase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "GET") return;

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

  res.status(200).json({
    name: existingUser.name,
    birthday: existingUser.birthday,
    profileImage: existingUser.profileImage,
  });

  await client.close();
};

export default handler;
