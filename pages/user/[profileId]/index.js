import { useEffect, useState } from "react";
import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import ProfileImage from "../../../components/atoms/ProfileImage/ProfileImage";
import {
  UserDetailsWrapper,
  Wrapper,
} from "../../../components/layouts/ProfilePage.styles";
import MainTemplate from "../../../components/templates/MainTemplate/MainTemplate";
import { format, parseISO } from "date-fns";
import { getSession, useSession } from "next-auth/react";
import Loading from "../../../components/organisms/Loading/Loading";
import UserProfilePosts from "../../../components/molecules/UserProfilePosts/UserProfilePosts";
import UserProfileFriends from "../../../components/molecules/UserProfileFriends/UserProfileFriends";
import GreyWrapper from "../../../components/molecules/GreyWrapper/GreyWrapper";
import RectangleButton from "../../../components/atoms/RectangleButton/RectangleButton";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import ErrorMessage from "../../../components/molecules/ErrorMessage/ErrorMessage";
import PropTypes from "prop-types";
import UserProfileEvents from "../../../components/molecules/UserProfileEvents/UserProfileEvents";
import { useRouter } from "next/router";

const ProfilePage = ({ user }) => {
  const [isFriend, setIsFriend] = useState(false);
  const [friends, setFriends] = useState(null);
  const { data: session, status } = useSession();
  const { dispatchError, error } = useError();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .post("/api/user/get-user", {
          email: session.user.email,
        })
        .then(({ data }) => {
          if (
            data.user.friends.map((friend) => friend.email).includes(user.email)
          ) {
            setIsFriend(true);
          } else {
            setIsFriend(false);
          }
        })
        .catch((e) => {
          setTimeout(() => {
            dispatchError(e.response.data.message);
          }, 1200);
        });
    };
    if (session && user) {
      getUser();
      setFriends(user.friends);
    }
  }, [dispatchError, session, user, friends]);

  const friendHandler = async () => {
    await axios
      .post("/api/user/add-friend", {
        email: user.email,
      })
      .then(({ data }) => {
        setFriends(data.friends);
        setIsFriend(data.isYourFriend);
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };

  if (status === "loading" || router.isFallback) {
    return <Loading />;
  }

  return (
    <MainTemplate userId={session.user.id}>
      <GreyWrapper>
        <Wrapper>
          <UserDetailsWrapper>
            <ProfileImage src={user.profileImage} width={144} height={144} />
            <div>
              <span>{user.name}</span>
              {session.user.email !== user.email ? (
                <RectangleButton onClick={friendHandler} lightGrey>
                  {!isFriend ? "Add friend" : "Remove friend"}
                </RectangleButton>
              ) : null}
            </div>
          </UserDetailsWrapper>
          <UserProfileFriends friends={friends} />
          <UserProfileEvents events={user.events} userId={user.id} />
          <UserProfilePosts posts={user.posts} email={session.user.email} />
        </Wrapper>
      </GreyWrapper>
      {error && <ErrorMessage message={error} />}
    </MainTemplate>
  );
};

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

export const getStaticPaths = async () => {
  const { client, db } = await connectToDataBase();

  const users = await db.collection("users").find().toArray();

  await client.close();

  return {
    paths: users.map((user) => ({
      params: { profileId: user._id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const profileId = params.profileId;

  const { client, db } = await connectToDataBase();

  const user = await db
    .collection("users")
    .findOne({ _id: ObjectId(profileId) });

  if (!user) {
    await client.close();
    return { notFound: true };
  }

  const posts = await db.collection("posts").find().sort({ _id: -1 }).toArray();

  const userPosts = posts.filter((post) => post.email === user.email);

  const events = await db
    .collection("events")
    .find()
    .sort({ date: 1 })
    .toArray();

  const userEvents = events.filter((event) => event.email === user.email);

  await client.close();

  return {
    props: {
      user: {
        id: user._id.toString(),
        email: user.email,
        profileImage: user.profileImage,
        name: user.name,
        friends: user.friends.map((friend) => ({
          id: friend.id.toString(),
          userId: friend.userId.toString(),
          email: friend.email,
          name: friend.name,
          profileImage: friend.profileImage,
        })),
        posts: userPosts.map((post) => ({
          id: post._id.toString(),
          userId: post.userId.toString(),
          email: post.email,
          date: format(new Date(post._id.getTimestamp()), "PP"),
          name: post.name,
          profileImage: post.profileImage,
          text: post.text,
          image: post.image,
          likes: post.likes,
          comments: post.comments,
        })),
        events: userEvents.map((event) => ({
          id: event._id.toString(),
          userId: event.userId.toString(),
          userName: event.userName,
          email: event.email,
          eventImage: event.eventImage,
          title: event.title,
          date: format(parseISO(event.date), "PP"),
          isBirthday: event.isBirthday,
        })),
      },
    },
    revalidate: 1,
  };
};

export default ProfilePage;
