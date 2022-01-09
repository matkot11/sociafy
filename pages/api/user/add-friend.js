import { connectToDataBase } from "../../../lib/db";
import { getAndCheckSession } from "../../../lib/getAndCheckSession";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email } = req.body;

  const session = await getAndCheckSession(req, res);

  const { client, db } = await connectToDataBase();

  let isYourFriend;

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  const friend = await db.collection("users").findOne({ email });

  const userFriendEmail = await user.friends.map((friend) => friend.email);

  const friendId = new ObjectId();

  const filteredFriends = user.friends.filter((user) => user.email !== email);

  if (userFriendEmail.includes(email)) {
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          friends: filteredFriends,
        },
      },
    );
    isYourFriend = false;
  } else {
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $push: {
          friends: {
            id: friendId,
            userId: friend._id,
            email,
            name: friend.name,
            profileImage: friend.profileImage,
          },
        },
      },
    );
    isYourFriend = true;
  }

  const friendsList = await db.collection("users").findOne({ email });

  res.status(201).json({
    friends: friendsList.friends,
    isYourFriend,
    message: "Friend added",
  });
  await client.close();
};

export default handler;
