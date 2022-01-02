import AuthTemplate from "../../components/templates/AuthTemplate/AuthTemplate";
import styled from "styled-components";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import UpdateUserDetails from "../../components/organisms/UpdateUserDetails/UpdateUserDetails";
import { useError } from "../../hooks/useError";
import { getAndCheckSession } from "../../lib/getAndCheckSession";
import { connectToDataBase } from "../../lib/db";

export const InnerWrapper = styled.div`
  margin-top: 2rem;
  width: 80%;
  justify-self: center;
  transition: all 0.5s;
`;

const UserDetails = ({ profileImage, name, birthday }) => {
  const { error } = useError();

  return (
    <AuthTemplate>
      <UpdateUserDetails
        profileImage={profileImage}
        name={name}
        birthday={birthday}
      />
      {error ? <ErrorMessage message={error} /> : null}
    </AuthTemplate>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getAndCheckSession(context.req, context.res);

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
      profileImage: existingUser.profileImage,
      name: existingUser.name,
      birthday: existingUser.birthday,
    },
  };
};

export default UserDetails;
