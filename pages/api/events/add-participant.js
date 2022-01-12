import { getAndCheckSession } from "../../../lib/getAndCheckSession";
import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { eventId } = req.body;

  const session = await getAndCheckSession(req, res);

  const { client, db } = await connectToDataBase();

  let areYouParticipant;

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

  const event = await db
    .collection("events")
    .findOne({ _id: ObjectId(eventId) });

  const participants = await event.participants;

  const participantsEmails = participants.map(
    (participant) => participant.email,
  );

  const filteredParticipants = participants.filter(
    (participant) => participant.email !== user.email,
  );

  const participantId = new ObjectId();

  if (participantsEmails.includes(user.email)) {
    await db.collection("events").updateOne(
      { _id: ObjectId(eventId) },
      {
        $set: {
          participants: filteredParticipants,
        },
      },
    );
    areYouParticipant = false;
  } else {
    await db.collection("events").updateOne(
      { _id: ObjectId(eventId) },
      {
        $push: {
          participants: {
            id: participantId,
            userId: user._id,
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
          },
        },
      },
    );
    areYouParticipant = true;
  }

  const updatedEvent = await db
    .collection("events")
    .findOne({ _id: ObjectId(eventId) });

  res.status(201).json({
    participants: updatedEvent.participants,
    areYouParticipant,
    message: "Participants updated successfully",
  });
  await client.close();
};

export default handler;
