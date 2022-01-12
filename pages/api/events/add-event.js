import { getAndCheckSession } from "../../../lib/getAndCheckSession";
import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { uploadImage } from "../../../lib/uploadImage";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { file, title, date, description } = req.body;

  const givenDate = new Date(date);
  const currentDate = new Date();
  if (givenDate <= currentDate) {
    res.status(404).json({ message: "Given date is in the past" });
    return;
  }

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

  if (!title && !date && !date && !description) {
    res.status(404).json({ message: "Event details not provided" });
    await client.close();
    return;
  }

  const eventImage = file
    ? file
    : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDEyOC41IDEyOC41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMjguNSAxMjguNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9Il94MzFfNCI+DQoJPGc+DQoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0VGOEQ2RjsiIGN4PSI2NC4yNSIgY3k9IjY0LjI1IiByPSI2NC4yNSIvPg0KCTwvZz4NCgk8Zz4NCgkJPHBhdGggc3R5bGU9ImZpbGw6I0YyRjJGMjsiIGQ9Ik04Ny44MDUsMjguOTc1aDAuNjE4YzcuMDgzLDAsMTIuODc4LDUuNzk1LDEyLjg3OCwxMi44Nzl2NDguMzQ1DQoJCQljMCw3LjA4My01Ljc5NiwxMi44NzktMTIuODc4LDEyLjg3OWgtMC42MThWNDcuMjg3YzIuNzA0LDAsNC44OTYtMi4xOTIsNC44OTYtNC44OTZjMC0yLjcwMy0yLjE5MS00Ljg5NS00Ljg5Ni00Ljg5NQ0KCQkJQzg3LjgwNSwzNy40OTYsODcuODA1LDI4Ljk3NSw4Ny44MDUsMjguOTc1eiBNNDAuNjk2LDI4Ljk3NWg0Ny4xMDl2OC41MjFoLTAuMDAxYy0yLjcwMywwLTQuODk2LDIuMTkyLTQuODk2LDQuODk1DQoJCQljMCwyLjcwNCwyLjE5Myw0Ljg5Niw0Ljg5Niw0Ljg5NmgwLjAwMXY1NS43OTFINDAuNjk2VjQ3LjI4N2MyLjcwMywwLDQuODk2LTIuMTkyLDQuODk2LTQuODk2YzAtMi43MDMtMi4xOTItNC44OTUtNC44OTYtNC44OTUNCgkJCVYyOC45NzV6IE00MC4wNzksMjguOTc1aDAuNjE3djguNTIxYy0yLjcwNCwwLTQuODk2LDIuMTkyLTQuODk2LDQuODk1YzAsMi43MDQsMi4xOTIsNC44OTYsNC44OTYsNC44OTZ2NTUuNzkxaC0wLjYxNw0KCQkJYy03LjA4NCwwLTEyLjg4LTUuNzk3LTEyLjg4LTEyLjg3OVY0MS44NTRDMjcuMTk5LDM0Ljc3LDMyLjk5NSwyOC45NzUsNDAuMDc5LDI4Ljk3NXoiLz4NCgkJPHBhdGggc3R5bGU9ImZpbGw6I0FGQUZBRjsiIGQ9Ik00MC42OTYsMjUuNDIyTDQwLjY5NiwyNS40MjJjMS4wNDYsMCwxLjkwMiwwLjg1NiwxLjkwMiwxLjkwMnYxMy4xNjUNCgkJCWMwLDEuMDQ2LTAuODU2LDEuOTAyLTEuOTAyLDEuOTAyaC0wLjAwMWMtMS4wNDcsMC0xLjkwMi0wLjg1Ni0xLjkwMi0xLjkwMlYyNy4zMjRDMzguNzk0LDI2LjI3OCwzOS42NSwyNS40MjIsNDAuNjk2LDI1LjQyMnoiLz4NCgkJPHBhdGggc3R5bGU9ImZpbGw6I0FGQUZBRjsiIGQ9Ik04Ny44MDUsMjUuNDIyTDg3LjgwNSwyNS40MjJjMS4wNDcsMCwxLjkwMiwwLjg1NiwxLjkwMiwxLjkwMnYxMy4xNjUNCgkJCWMwLDEuMDQ2LTAuODU1LDEuOTAyLTEuOTAyLDEuOTAyaC0wLjAwMWMtMS4wNDcsMC0xLjkwMy0wLjg1Ni0xLjkwMy0xLjkwMlYyNy4zMjRDODUuOTAyLDI2LjI3OCw4Ni43NTgsMjUuNDIyLDg3LjgwNSwyNS40MjJ6Ii8+DQoJCTxyZWN0IHg9IjI3LjE5OSIgeT0iNTAuNjc1IiBzdHlsZT0iZmlsbDojRkFCQjE4OyIgd2lkdGg9Ijc0LjEwMiIgaGVpZ2h0PSIzLjEwNyIvPg0KCQk8cmVjdCB4PSI1My4yMzYiIHk9IjU5LjMwNCIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSIzOC4xOTkiIHk9IjU4Ljk1NCIgc3R5bGU9ImZpbGw6I0M5Njc1QjsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSI2OC43MjciIHk9IjU5LjMwNCIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSI4My4wODgiIHk9IjU5LjMwNCIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSI1My41ODYiIHk9IjcyLjk5NiIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSI2OS4wNzciIHk9IjcyLjk5NiIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSI4My4wODgiIHk9IjczLjM0NiIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSI1My41ODYiIHk9Ijg3LjMyNyIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQzOSIvPg0KCQk8cmVjdCB4PSIzOC4zNzMiIHk9IjcyLjk5NiIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQ1MyIvPg0KCQk8cmVjdCB4PSIzOC4zNzMiIHk9Ijg3LjMyNyIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQzOSIvPg0KCQk8cmVjdCB4PSI2OC43MjciIHk9Ijg3LjY3NyIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQzOSIvPg0KCQk8cmVjdCB4PSI4My4wODgiIHk9Ijg3LjY3NyIgc3R5bGU9ImZpbGw6I0VGQ0I2QzsiIHdpZHRoPSI5LjU4NCIgaGVpZ2h0PSI4LjQzOSIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K";

  const id = new ObjectId();

  const { imageUrl } = await uploadImage(res, eventImage, id, "events");

  await db.collection("events").insertOne({
    _id: id,
    userId: existingUser._id,
    userName: existingUser.name,
    email: existingUser.email,
    eventImage: imageUrl,
    title: title,
    date: date,
    description: description,
    isBirthday: false,
    participants: [],
  });

  res.status(201).json({ message: "Event created successfully" });
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
