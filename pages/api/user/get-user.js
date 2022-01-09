import { connectToDataBase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email } = req.body;

  const { client, db } = await connectToDataBase();

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

  await client.close();
  res.status(201).json({
    user,
    message: "User details got successfully",
  });
};

export default handler;
