import { getSession } from "next-auth/react";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import { connectToDataBase } from "../lib/db";
import AddPostButton from "../components/organisms/AddPostButton/AddPostButton";
import Post from "../components/organisms/Post/Post";
import useModal from "../hooks/useModal";
import Modal from "../components/molecules/Modal/Modal";
import CreatePost from "../components/organisms/CreatePost/CreatePost";

const HomePage = ({ profileImage }) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  return (
    <MainTemplate id="root">
      <AddPostButton
        profileImage={profileImage}
        onClick={() => handleOpenModal()}
      />
      <Post profileImage={profileImage} />
      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        <CreatePost />
      </Modal>
    </MainTemplate>
  );
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

  const { existingUser, client } = await connectToDataBase(
    context.res,
    "users",
    {
      email: session.user.email,
    },
  );
  await client.close();

  return {
    props: {
      session,
      profileImage: existingUser.profileImage,
    },
  };
};

export default HomePage;
