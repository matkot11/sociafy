import AuthTemplate from "../../components/templates/AuthTemplate/AuthTemplate";
import styled from "styled-components";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import RegisterUserDetails from "../../components/organisms/RegisterUserDetails/RegisterUserDetails";
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
      <RegisterUserDetails />
      {error ? <ErrorMessage message={error} /> : null}
    </AuthTemplate>
  );
};

export default UserDetails;
