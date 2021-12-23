import { connectToDataBase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password, repeatPassword } = data;

  if (!email || !email.includes("@")) {
    res.status(422).json({
      message: "Email does not contain @ symbol",
    });
    return;
  }

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message: "Password has to be at least 6 characters long",
    });
    return;
  }

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6 ||
    password !== repeatPassword
  ) {
    res.status(422).json({
      message: "Passwords are not the same",
    });
    return;
  }

  const client = await connectToDataBase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created!" });
  await client.close();
};

export default handler;
