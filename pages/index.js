import { useState } from "react";
import { getSession } from "next-auth/react";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import { connectToDataBase } from "../lib/db";
import AddPostButton from "../components/molecules/AddPostButton/AddPostButton";
import useModal from "../hooks/useModal";
import Modal from "../components/molecules/Modal/Modal";
import CreatePost from "../components/organisms/CreatePost/CreatePost";
import Posts from "../components/organisms/Posts/Posts";
import { format } from "date-fns";
import ErrorMessage from "../components/molecules/ErrorMessage/ErrorMessage";
import { useError } from "../hooks/useError";
import PropTypes from "prop-types";
import RectangleButton from "../components/atoms/RectangleButton/RectangleButton";
import styled from "styled-components";

const StyledRectangleButton = styled(RectangleButton)`
  margin-top: 2rem;
  width: 80%;
`;

const HomePage = ({ profileImage, posts, friendsPosts, session, userId }) => {
  const [isFriendsPostsOpen, setIsFriendsPostsOpen] = useState(false);
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { error } = useError();

  return (
    <MainTemplate userId={userId}>
      <AddPostButton profileImage={profileImage} onClick={handleOpenModal} />
      {isFriendsPostsOpen ? (
        <StyledRectangleButton
          onClick={() => setIsFriendsPostsOpen(false)}
          lightGrey
        >
          See all posts
        </StyledRectangleButton>
      ) : (
        <StyledRectangleButton
          onClick={() => setIsFriendsPostsOpen(true)}
          lightGrey
        >
          See your friends posts
        </StyledRectangleButton>
      )}
      {isFriendsPostsOpen ? (
        <Posts
          posts={friendsPosts}
          email={session.user.email}
          displayDelete={true}
        />
      ) : (
        <Posts posts={posts} email={session.user.email} displayDelete={true} />
      )}

      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        <CreatePost />
      </Modal>
      {error && <ErrorMessage message={error} />}
    </MainTemplate>
  );
};

HomePage.propTypes = {
  profileImage: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  friendsPosts: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const { client, db } = await connectToDataBase();

  const existingUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (!existingUser) {
    context.res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

  const posts = await db.collection("posts").find().sort({ _id: -1 }).toArray();
  const filteredPosts = [];
  const existingUserFriends = existingUser.friends;
  const existingUserFriendsEmails = existingUserFriends.map(
    (friend) => friend.email,
  );

  existingUserFriendsEmails.map((email) =>
    filteredPosts.push(posts.filter((post) => post.email === email)[0]),
  );

  await client.close();

  return {
    props: {
      session,
      profileImage: existingUser.profileImage,
      userId: existingUser._id.toString(),
      posts: posts.map((post) => ({
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
      friendsPosts: filteredPosts.map((post) => ({
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
    },
  };
};

export default HomePage;
