import { useState } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate/AuthTemplate";
import Login from "../../components/organisms/Login/Login";
import Register from "../../components/organisms/Register/Register";
import {
  InnerWrapper,
  LoginWrapper,
  RegisterWrapper,
} from "../../components/Layouts/Auth.styles";

const Auth = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const handleDisplayAuth = (e, bool) => {
    e.preventDefault();
    setIsLoginOpen(bool);
  };

  return (
    <AuthTemplate>
      <InnerWrapper>
        <LoginWrapper isOpenLogin={isLoginOpen && "isOpenLogin"}>
          <Login
            onClickLogin={(e) => handleDisplayAuth(e, true)}
            onClickRegister={(e) => handleDisplayAuth(e, false)}
          />
        </LoginWrapper>
        <RegisterWrapper isOpenLogin={isLoginOpen && "isOpenLogin"}>
          <Register
            onClickLogin={(e) => handleDisplayAuth(e, true)}
            onClickRegister={(e) => handleDisplayAuth(e, false)}
          />
        </RegisterWrapper>
      </InnerWrapper>
    </AuthTemplate>
  );
};

export default Auth;
