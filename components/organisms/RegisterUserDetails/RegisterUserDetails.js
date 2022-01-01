import { useState, useRef } from "react";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import FileInput from "../../atoms/FileInput/FileInput";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import Loading from "../Loading/Loading";
import { useRouter } from "next/router";
import { ButtonWrapper } from "./RegisterUserDetails.styles";

const RegisterUserDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fullNameRef = useRef();
  const birthdayRef = useRef();
  const { dispatchError } = useError();
  const router = useRouter();

  const profileImageHandler = async (e) => {
    await setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);

    reader.onload = async () => {
      await setProfileImage(reader.result);
      await setProfileImage(reader.result);
    };
  };

  const userDetailsHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredFullName = fullNameRef.current.value;
    const enteredBirthdayName = birthdayRef.current.value;

    await axios
      .post("/api/auth/signup-details", {
        file: profileImage,
        fullName: enteredFullName,
        birthday: enteredBirthdayName,
      })
      .then((response) => {
        setIsLoading(false);
        router.replace("/");
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
          setIsLoading(false);
        }, 1200);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form onSubmit={userDetailsHandler}>
      {selectedFile ? (
        <ProfileImage src={URL.createObjectURL(selectedFile)} />
      ) : (
        <ProfileImage src="/icons/user.svg" />
      )}
      <FileInput onChange={profileImageHandler} />
      <Input
        ref={fullNameRef}
        inputType="text"
        name="Full name"
        required={false}
      />
      <Input
        ref={birthdayRef}
        inputType="date"
        name="Birth date"
        required={false}
      />
      <ButtonWrapper>
        <RectangleButton onClick={() => router.replace("/")}>
          Cancel
        </RectangleButton>
        <RectangleButton onSubmit={userDetailsHandler}>Upload</RectangleButton>
      </ButtonWrapper>
    </Form>
  );
};
export default RegisterUserDetails;
