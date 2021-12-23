import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useError } from "../../../hooks/useError";
import Loading from "../Loading/Loading";

const Login = ({ onClickRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchError } = useError();
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result.error) {
      setTimeout(() => {
        dispatchError(result.error);
        setIsLoading(false);
      }, 1200);
    }

    if (!result.error) {
      setIsLoading(false);
      await router.replace("/");
      console.log(result);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Form onSubmit={loginHandler}>
        <Input
          ref={emailRef}
          inputType="email"
          name="Email"
          isRequired={true}
        />
        <Input
          ref={passwordRef}
          inputType="password"
          name="Password"
          isRequired={true}
        />
        <RectangleButton>Login</RectangleButton>
      </Form>
      <RectangleButton onClick={onClickRegister}>Register</RectangleButton>
    </>
  );
};

Login.propTypes = {
  onClickRegister: PropTypes.func,
};

export default Login;
