import AuthTemplate from "../../components/templates/AuthTemplate/AuthTemplate";
import styled from "styled-components";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import UpdateUserDetails from "../../components/organisms/UpdateUserDetails/UpdateUserDetails";
import { useError } from "../../hooks/useError";

export const InnerWrapper = styled.div`
  margin-top: 2rem;
  width: 80%;
  justify-self: center;
  transition: all 0.5s;
`;

const UserDetails = () => {
  const { error } = useError();

  return (
    <AuthTemplate>
      <UpdateUserDetails />
      {error ? <ErrorMessage message={error} /> : null}
    </AuthTemplate>
  );
};

export default UserDetails;
