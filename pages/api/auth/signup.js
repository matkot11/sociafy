import { connectToDataBase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { ObjectId } from "mongodb";
import cloudinary from "cloudinary";

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
  const id = new ObjectId();
  const file =
    "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjM0EzQjNDIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDI5IDI5Ij4KICAgIDxwYXRoIGQ9Ik0xNC41LDJBMTIuNTE0MDgsMTIuNTE0MDgsMCwwLDAsMiwxNC41LDEyLjUyMTMxLDEyLjUyMTMxLDAsMCwwLDE0LjUsMjdhMTIuNSwxMi41LDAsMCwwLDAtMjVabTcuNjAzMDksMTkuNzEyODNhOC40ODAwNSw4LjQ4MDA1LDAsMCwwLTE1LjE5ODczLjAwODI0QTEwLjM2NjU5LDEwLjM2NjU5LDAsMCwxLDQsMTQuNWExMC41LDEwLjUsMCwwLDEsMjEsMEExMC4zNjgwNywxMC4zNjgwNywwLDAsMSwyMi4xMDMwOSwyMS43MTI4M1pNMTQuNSw3QTQuNSw0LjUsMCwxLDAsMTksMTEuNSw0LjUsNC41LDAsMCwwLDE0LjUsN1oiLz4KPC9zdmc+Cg==";
  let imageUrl = "";

  await cloudinary.v2.uploader
    .upload(file, {
      resource_type: "image",
      public_id: `users/${id}`,
      use_filename: true,
      filename_override: id,
    })
    .then((response) => (imageUrl = response.url))
    .catch((e) =>
      res
        .status(404)
        .json({ message: "Profile image did not upload correctly" }),
    );

  await db.collection("users").insertOne({
    _id: id,
    email: email,
    password: hashedPassword,
    profileImage: imageUrl,
  });

  res.status(201).json({ message: "User created!" });
  await client.close();
};

export default handler;
