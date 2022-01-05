import { getSession, signOut } from "next-auth/react";
import Navbar from "../components/organisms/Navbar/Navbar";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";

const HomePage = () => {
  return (
    <MainTemplate>
      <h1>Home Page</h1>
      <button onClick={async () => await signOut()}>Logout</button>
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

  return {
    props: { session },
  };
};

export default HomePage;
