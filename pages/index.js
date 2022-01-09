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

const HomePage = ({ profileImage, posts, session, userId }) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { error } = useError();

  return (
    <MainTemplate userId={userId}>
      <AddPostButton profileImage={profileImage} onClick={handleOpenModal} />
      <Posts posts={posts} email={session.user.email} />
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

  await client.close();

  // // Updates posts with newest [profileId] images and names
  // for (const post of posts) {
  //   const { collection, client } = await connectToDataBase(
  //     context.res,
  //     "users",
  //     {
  //       email: post.email,
  //     },
  //   );
  //
  //   await db.collection("posts").updateOne(
  //     { email: post.email },
  //     {
  //       $set: {
  //         profileImage: collection.profileImage,
  //         name: collection.name,
  //       },
  //     },
  //   );
  // }

  return {
    props: {
      session,
      profileImage: existingUser.profileImage,
      userId: existingUser._id.toString(),
      posts: posts.map((post) => ({
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
      revalidate: 1,
    },
  };
};

export default HomePage;
