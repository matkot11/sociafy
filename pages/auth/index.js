import { useState } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate/AuthTemplate";
import Login from "../../components/organisms/Login/Login";
import Register from "../../components/organisms/Register/Register";
import {
  InnerWrapper,
  LoginWrapper,
  RegisterWrapper,
} from "../../components/Layouts/Auth.styles";
import { useError } from "../../hooks/useError";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import { useSession } from "next-auth/react";
import Loading from "../../components/organisms/Loading/Loading";

const Auth = () => {
  const { status } = useSession();

  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const { dispatchError, error } = useError();
  const handleDisplayAuth = (e, bool) => {
    e.preventDefault();
    setIsLoginOpen(bool);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <AuthTemplate>
      <InnerWrapper>
        <LoginWrapper isOpenLogin={isLoginOpen && "isOpenLogin"}>
          <Login onClickRegister={(e) => handleDisplayAuth(e, false)} />
        </LoginWrapper>
        <RegisterWrapper isOpenLogin={isLoginOpen && "isOpenLogin"}>
          <Register onClickLogin={(e) => handleDisplayAuth(e, true)} />
        </RegisterWrapper>
      </InnerWrapper>
      {error ? <ErrorMessage message={error} /> : null}
    </AuthTemplate>
  );
};

export default Auth;
