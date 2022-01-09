import { useEffect, useState } from "react";
import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import ProfileImage from "../../../components/atoms/ProfileImage/ProfileImage";
import {
  UserDetailsWrapper,
  Wrapper,
} from "../../../components/layouts/Profile.styles";
import MainTemplate from "../../../components/templates/MainTemplate/MainTemplate";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Loading from "../../../components/organisms/Loading/Loading";
import UserProfilePosts from "../../../components/molecules/UserProfilePosts/UserProfilePosts";
import UserProfileFriends from "../../../components/molecules/UserProfileFriends/UserProfileFriends";
import GreyWrapper from "../../../components/molecules/GreyWrapper/GreyWrapper";
import RectangleButton from "../../../components/atoms/RectangleButton/RectangleButton";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import ErrorMessage from "../../../components/molecules/ErrorMessage/ErrorMessage";

const Profile = ({ user }) => {
  const [isFriend, setIsFriend] = useState(false);
  const [friends, setFriends] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const { data: session, status } = useSession();
  const { dispatchError, error } = useError();

  useEffect(() => {
    const getUser = async () => {
      await axios
        .post("/api/user/get-user", {
          email: session.user.email,
        })
        .then(({ data }) => {
          setAuthUser(data.user);
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

    if (session) {
      getUser();
      setFriends(user.friends);
    }
  }, [dispatchError, session, user.email]);

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

  if (status === "loading" || !authUser) {
    return <Loading />;
  }

  return (
    <MainTemplate userId={authUser._id}>
      <GreyWrapper>
        <Wrapper>
          <UserDetailsWrapper>
            <ProfileImage src={user.profileImage} width={144} height={144} />
            <div>
              <span>{user.name}</span>
              {session.user.email !== user.email ? (
                !isFriend ? (
                  <RectangleButton onClick={friendHandler} lightGrey>
                    Add friend
                  </RectangleButton>
                ) : (
                  <RectangleButton onClick={friendHandler} lightGrey>
                    Remove friend
                  </RectangleButton>
                )
              ) : null}
            </div>
          </UserDetailsWrapper>
          <UserProfileFriends friends={friends} />
          <UserProfilePosts posts={user.posts} email={session.user.email} />
        </Wrapper>
      </GreyWrapper>
      {error && <ErrorMessage message={error} />}
    </MainTemplate>
  );
};

export const getStaticPaths = async () => {
  const { client, db } = await connectToDataBase();

  const users = await db.collection("users").find().toArray();

  await client.close();

  return {
    fallback: "blocking",
    paths: users.map((user) => ({
      params: { profileId: user._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const profileId = context.params.profileId;

  const { client, db } = await connectToDataBase();

  const user = await db
    .collection("users")
    .findOne({ _id: ObjectId(profileId) });

  const posts = await db.collection("posts").find().sort({ _id: -1 }).toArray();

  const userPosts = posts.filter((post) => post.email === user.email);

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
          email: post.email,
          date: format(new Date(post._id.getTimestamp()), "PP"),
          name: post.name,
          profileImage: post.profileImage,
          text: post.text,
          image: post.image,
          likes: post.likes,
          comments: post.comments,
        })),
      },
    },
  };
};

export default Profile;
