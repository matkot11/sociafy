import { connectToDataBase } from "../../../lib/db";
import { getAndCheckSession } from "../../../lib/getAndCheckSession";
import { uploadImage } from "../../../lib/uploadImage";
import { ObjectId } from "mongodb";

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
  let birthdayDate;
  if (birthday) {
    const currentDate = new Date();

    birthdayDate = `${currentDate.getFullYear()}-${birthday.split("-")[1]}-${
      birthday.split("-")[2]
    }`;
  }

  let image = "";
  if (file) {
    const { imageUrl } = await uploadImage(
      res,
      file,
      existingUser._id.toString(),
      "users",
    );
    image = imageUrl;
  }

  try {
    await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          profileImage: file ? image : existingUser.profileImage,
          name: name ? name : existingUser.name,
          birthday: birthday ? birthdayDate : existingUser.birthday,
        },
      },
    );
  } catch (e) {
    res.status(404).json({ message: "User did not update correctly" });
    await client.close();
  }

  try {
    await db.collection("posts").updateMany(
      { email: session.user.email },
      {
        $set: {
          profileImage: file ? image : existingUser.profileImage,
          name: name ? name : existingUser.name,
        },
      },
    );
  } catch (e) {
    res.status(404).json({ message: "Posts did not update correctly" });
    await client.close();
  }

  try {
    await db.collection("posts").updateMany(
      { comments: { $elemMatch: { email: session.user.email } } },
      {
        $set: {
          "comments.$.name": name ? name : existingUser.name,
        },
      },
    );
  } catch (e) {
    res.status(404).json({ message: "Comments did not update correctly" });
    await client.close();
  }

  try {
    await db.collection("events").updateMany(
      { participants: { $elemMatch: { email: session.user.email } } },
      {
        $set: {
          "participants.$.name": name ? name : existingUser.name,
          "participants.$.profileImage": file
            ? image
            : existingUser.profileImage,
        },
      },
    );
  } catch (e) {
    res.status(404).json({ message: "Comments did not update correctly" });
    await client.close();
  }

  if (existingUser.birthday !== null) {
    await db.collection("events").deleteOne({ userId: existingUser._id });

    const id = new ObjectId();

    const eventImage =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iIzJjNDM1NSIgZD0iTTQuNTc1IDI3Ljk2MmEuNS41IDAgMCAxLS40NDQtLjczMWw3Ljc3OC0xNC44NDlhLjUwMS41MDEgMCAwIDEgLjc5Ny0uMTIxbDcuMDcxIDcuMDcxYS41LjUgMCAwIDEtLjEyMS43OTdsLTE0Ljg1IDcuNzc4YS41MS41MSAwIDAgMS0uMjMxLjA1NXptNy45MDUtMTQuNTE0TDUuNzYgMjYuMjc3bDEyLjgyOS02LjcyLTYuMTA5LTYuMTA5eiIvPjxwYXRoIGZpbGw9IiMyYzQzNTUiIGQ9Ik05LjA1NyAyNS42MTVhLjQ4Mi40ODIgMCAwIDEtLjE0OS0uMDIzbC0yLjc5NC0uODczYS41LjUgMCAxIDEgLjI5OS0uOTU0bDIuNzk0Ljg3M2EuNS41IDAgMCAxLS4xNS45Nzd6TTEyLjM4NiAyMy44NzFhLjQ4Mi40ODIgMCAwIDEtLjE0OS0uMDIzbC00Ljg3LTEuNTIxYS41LjUgMCAxIDEgLjI5OS0uOTU0bDQuODcgMS41MjFhLjUuNSAwIDAgMS0uMTUuOTc3ek0xNS43MTUgMjIuMTI3YS40ODIuNDgyIDAgMCAxLS4xNDktLjAyM2wtNi45NDUtMi4xN2EuNS41IDAgMSAxIC4yOTktLjk1NGw2Ljk0NSAyLjE3YS41LjUgMCAwIDEtLjE1Ljk3N3pNMTkuMDQ0IDIwLjM4M2EuNDgyLjQ4MiAwIDAgMS0uMTQ5LS4wMjNsLTkuMDIyLTIuODJhLjUuNSAwIDEgMSAuMjk5LS45NTRsOS4wMjIgMi44MmEuNS41IDAgMCAxLS4xNS45Nzd6TTE1Ljc4MiAxNi41OGEuNDgyLjQ4MiAwIDAgMS0uMTQ5LS4wMjNsLTQuNTA3LTEuNDA5YS41LjUgMCAxIDEgLjI5OS0uOTU0bDQuNTA3IDEuNDA5YS41LjUgMCAwIDEtLjE1Ljk3N3oiLz48cGF0aCBmaWxsPSIjZjE1NzQzIiBkPSJNOC41IDEzLjAzOGExLjUwMiAxLjUwMiAwIDAgMS0xLjExNy0yLjUgMS40OTYgMS40OTYgMCAwIDEgMC0yIDEuNTAyIDEuNTAyIDAgMCAxIDEuMTE3LTIuNS41LjUgMCAwIDEgMCAxIC41LjUgMCAwIDAgMCAxIC41LjUgMCAwIDEgMCAxIC41LjUgMCAwIDAgMCAxIC41LjUgMCAwIDEgMCAxIC41LjUgMCAwIDAgMCAxIC41LjUgMCAwIDEgMCAxek0yMi4yMzIgMTQuMDk3Yy0uMzg0IDAtLjc2OC0uMTQ2LTEuMDYxLS40MzhhLjUuNSAwIDAgMSAuNzA3LS43MDguNS41IDAgMCAwIC43MDctLjcwOC40OTguNDk4IDAgMCAxIDAtLjcwOGMuMTk1LS4xOTUuNTEyLS4xOTUuNzA3IDBhLjUuNSAwIDAgMCAuNzA3LS43MDcuNDk4LjQ5OCAwIDAgMSAwLS43MDguNS41IDAgMCAxIC43MDcgMCAuNTE0LjUxNCAwIDAgMCAuNzA3IDAgLjQ5NS40OTUgMCAwIDAgLjE0Ni0uMzU0LjQ5NS40OTUgMCAwIDAtLjE0Ni0uMzUzLjUuNSAwIDAgMSAuNzA3LS43MDhjLjI4My4yODMuNDM5LjY2LjQzOSAxLjA2MWExLjQ5OSAxLjQ5OSAwIDAgMS0xLjQxNyAxLjQ5OCAxLjQ5NiAxLjQ5NiAwIDAgMS0xLjQxNSAxLjQxNWMtLjAyLjM1Ni0uMTY1LjcwNy0uNDM3Ljk3OC0uMjg5LjI5NC0uNjc0LjQ0LTEuMDU4LjQ0ek0xNi42NzUgMjUuOTk4YS41LjUgMCAwIDEtLjQzLS4yNDUgMS40OTggMS40OTggMCAwIDEgMS41OC0yLjIzN2MuMTA3LS4zNC4zMzUtLjY0NC42NjUtLjgzOWExLjQ4IDEuNDggMCAwIDEgMS4wNTUtLjE4MWMuMTEtLjM1My4zNDQtLjY0OS42NjUtLjgzOWExLjQ4MSAxLjQ4MSAwIDAgMSAxLjEzNy0uMTYzYy4zODguMDk5LjcxNS4zNDQuOTE5LjY4OGEuNS41IDAgMSAxLS44NjIuNTEuNDk3LjQ5NyAwIDAgMC0uOTE0LjEzMi40OTUuNDk1IDAgMCAwIC4wNTUuMzc4LjUwMi41MDIgMCAwIDEtLjg2LjUxMS41MDIuNTAyIDAgMCAwLS44NjEuNTExLjUuNSAwIDAgMS0uODYyLjUxLjUwMi41MDIgMCAwIDAtLjkxNC4xMzIuNDk1LjQ5NSAwIDAgMCAuMDU1LjM3OC40OTkuNDk5IDAgMCAxLS40MjguNzU0ek0xNS41IDcuMDM4Yy0uODI3IDAtMS41LS42NzMtMS41LTEuNXMuNjczLTEuNSAxLjUtMS41YTEuNTAxIDEuNTAxIDAgMCAxIDAgM3ptMC0yYS41LjUgMCAxIDAgLjAwMiAxLjAwMi41LjUgMCAwIDAtLjAwMi0xLjAwMnpNMjMuNSA3LjAzOGMtLjgyNyAwLTEuNS0uNjczLTEuNS0xLjVzLjY3My0xLjUgMS41LTEuNWExLjUwMSAxLjUwMSAwIDAgMSAwIDN6bTAtMmEuNS41IDAgMSAwIC4wMDIgMS4wMDIuNS41IDAgMCAwLS4wMDItMS4wMDJ6TTI3LjUgMTcuMDM4Yy0uODI3IDAtMS41LS42NzMtMS41LTEuNXMuNjczLTEuNSAxLjUtMS41IDEuNS42NzMgMS41IDEuNS0uNjczIDEuNS0xLjUgMS41em0wLTJhLjUuNSAwIDEgMCAuMDAyIDEuMDAyLjUuNSAwIDAgMC0uMDAyLTEuMDAyek00LjUgMjEuMDM4Yy0uODI3IDAtMS41LS42NzMtMS41LTEuNXMuNjczLTEuNSAxLjUtMS41YTEuNTAxIDEuNTAxIDAgMCAxIDAgM3ptMC0yYS41LjUgMCAxIDAgLjAwMiAxLjAwMi41LjUgMCAwIDAtLjAwMi0xLjAwMnpNMjQuNSAyNy4wMzhjLS44MjcgMC0xLjUtLjY3My0xLjUtMS41cy42NzMtMS41IDEuNS0xLjUgMS41LjY3MyAxLjUgMS41LS42NzMgMS41LTEuNSAxLjV6bTAtMmEuNS41IDAgMSAwIC4wMDIgMS4wMDIuNS41IDAgMCAwLS4wMDItMS4wMDJ6Ii8+PHBhdGggZmlsbD0iIzJjNDM1NSIgZD0iTTI1LjUwOSAxOS4wNzlhLjUuNSAwIDAgMS0uMzc2LS4xN0E1LjUwMyA1LjUwMyAwIDAgMCAyMSAxNy4wMzdjLTEuMTcgMC0yLjMzMy4zODQtMy4yNzMgMS4wODFhLjQ5OS40OTkgMCAxIDEtLjU5NS0uODAzIDYuNTQ4IDYuNTQ4IDAgMCAxIDMuODY5LTEuMjc3YzEuODcgMCAzLjY1LjgwNiA0Ljg4NSAyLjIxMWEuNTAxLjUwMSAwIDAgMS0uMzc3Ljgzek0yNi45MjEgMjIuMDc2YS41LjUgMCAwIDEtLjQ5My0uNDIxIDUuMzI1IDUuMzI1IDAgMCAwLS4yNDUtLjk1Ni41LjUgMCAxIDEgLjk0NC0uMzMyIDYuNjk4IDYuNjk4IDAgMCAxIC4yODkgMS4xMy41MDEuNTAxIDAgMCAxLS40OTUuNTc5ek0xMy44OTcgMTQuNjU3YS41LjUgMCAwIDEtLjQ1LS43MThBNS41MTggNS41MTggMCAwIDAgMTQgMTEuNTM4YzAtLjk2NC0uMjU1LTEuOTE2LS43MzYtMi43NWEuNS41IDAgMSAxIC44NjYtLjUgNi41MTEgNi41MTEgMCAwIDEgLjIxOCA2LjA4OC41LjUgMCAwIDEtLjQ1MS4yODF6TTEyLjUxNiA3LjU3OWEuNDk4LjQ5OCAwIDAgMS0uMzMzLS4xMjcgNS44NDcgNS44NDcgMCAwIDAtLjQyNy0uMzQ2LjUwMS41MDEgMCAwIDEgLjU5NC0uODA2IDYuODY0IDYuODY0IDAgMCAxIC40OTkuNDA2LjUuNSAwIDAgMS0uMzMzLjg3M3pNMTcuMjk0IDE1LjA1NGEuNS41IDAgMCAxLS4zNjMtLjg0NUE3LjQ2IDcuNDYgMCAwIDAgMTkgOS4wMzhjMC0xLjEzMy0uMjYzLTIuMjctLjc1OS0zLjI4N2EuNS41IDAgMSAxIC44OTgtLjQzOEE4LjUzIDguNTMgMCAwIDEgMjAgOS4wMzhhOC40NiA4LjQ2IDAgMCAxLTIuMzQ0IDUuODYxLjQ5OC40OTggMCAwIDEtLjM2Mi4xNTV6Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iMTQuNTM4IiByPSIuNSIgZmlsbD0iI2YxNTc0MyIvPjwvc3ZnPg==";

    const { imageUrl } = await uploadImage(res, eventImage, id, "events");
    try {
      await db.collection("events").insertOne({
        _id: id,
        userId: existingUser._id,
        userName: name ? name : existingUser.name,
        email: existingUser.email,
        eventImage: imageUrl,
        title: `${name ? name : existingUser.name}'s birthday`,
        date: birthday ? birthdayDate : existingUser.birthday,
        description: `This is ${existingUser.name}'s birthday!!!`,
        isBirthday: true,
        participants: [],
      });
    } catch (e) {
      res
        .status(404)
        .json({ message: "Birthday event did not upload correctly" });
      await client.close();
    }
  }

  res.status(201).json({ message: "User created!" });

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
