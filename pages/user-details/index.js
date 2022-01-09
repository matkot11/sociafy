import styled from "styled-components";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import UpdateUserDetails from "../../components/organisms/UpdateUserDetails/UpdateUserDetails";
import { useError } from "../../hooks/useError";
import { getAndCheckSession } from "../../lib/getAndCheckSession";
import { connectToDataBase } from "../../lib/db";
import MainTemplate from "../../components/templates/MainTemplate/MainTemplate";

export const InnerWrapper = styled.div`
  margin-top: 2rem;
  width: 80%;
  justify-self: center;
  transition: all 0.5s;
`;

const UserDetails = ({ id, profileImage, name, birthday }) => {
  const { error } = useError();

  return (
    <MainTemplate userId={id}>
      <UpdateUserDetails
        profileImage={profileImage}
        name={name}
        birthday={birthday}
      />
      {error && <ErrorMessage message={error} />}
    </MainTemplate>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getAndCheckSession(context.req, context.res);

  const { client, db } = await connectToDataBase();

  const existingUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (!existingUser) {
    context.res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

  await client.close();

  return {
    props: {
      id: existingUser._id.toString(),
      profileImage: existingUser.profileImage,
      name: existingUser.name,
      birthday: existingUser.birthday,
    },
  };
};

export default UserDetails;
