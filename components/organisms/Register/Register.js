import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingCircle from "../../atoms/LoadingCircle/LoadingCircle";

const Register = ({ onClickLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const { dispatchError } = useError();
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredRepeatPassword = repeatPasswordRef.current.value;
    setIsLoading(true);

    await axios
      .post("/api/auth/signup", {
        email: enteredEmail,
        password: enteredPassword,
        repeatPassword: enteredRepeatPassword,
      })
      .then(async () => {
        const loginResponse = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });

        if (!loginResponse.error) {
          await router.replace("/user-details");
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
          setIsLoading(false);
        }, 1200);
      });
  };

  return (
    <>
      <Form onSubmit={registerHandler}>
        <Input ref={emailRef} inputType="email" name="Email*" required={true} />
        <Input
          ref={passwordRef}
          inputType="password"
          name="Password*"
          required={true}
        />
        <Input
          ref={repeatPasswordRef}
          inputType="password"
          name="Repeat Password*"
          required={true}
        />
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <RectangleButton disabled={isLoading}>Register</RectangleButton>
        )}
      </Form>
      {!isLoading && (
        <RectangleButton onClick={onClickLogin}>Login</RectangleButton>
      )}
    </>
  );
};

Register.propTypes = {
  onClickLogin: PropTypes.func,
};

export default Register;
