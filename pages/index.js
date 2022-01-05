import { getSession } from "next-auth/react";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import { connectToDataBase } from "../lib/db";
import AddPostButton from "../components/organisms/AddPostButton/AddPostButton";

const HomePage = ({ profileImage }) => {
  return (
    <MainTemplate>
      <AddPostButton profileImage={profileImage} />
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
