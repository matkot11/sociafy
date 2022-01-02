import { useState } from "react";
import AuthTemplate from "../../components/templates/AuthTemplate/AuthTemplate";
import Login from "../../components/organisms/Login/Login";
import Register from "../../components/organisms/Register/Register";
import {
  LoginWrapper,
  RegisterWrapper,
} from "../../components/Layouts/Auth.styles";
import { useError } from "../../hooks/useError";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import { getSession, useSession } from "next-auth/react";
import Loading from "../../components/organisms/Loading/Loading";

const Auth = () => {
  const { status } = useSession();
  const { error } = useError();
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const handleDisplayAuth = (e, bool) => {
    e.preventDefault();
    setIsLoginOpen(bool);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <AuthTemplate>
      <LoginWrapper isOpenLogin={isLoginOpen && "isOpenLogin"}>
        <Login onClickRegister={(e) => handleDisplayAuth(e, false)} />
      </LoginWrapper>
      <RegisterWrapper isOpenLogin={isLoginOpen && "isOpenLogin"}>
        <Register onClickLogin={(e) => handleDisplayAuth(e, true)} />
      </RegisterWrapper>
      {error ? <ErrorMessage message={error} /> : null}
    </AuthTemplate>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Auth;
