import { getSession, signOut } from "next-auth/react";

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={async () => await signOut()}>Logout</button>
    </>
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
