import { useState, useRef, useEffect } from "react";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import FileInput from "../../atoms/FileInput/FileInput";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import Loading from "../Loading/Loading";
import { useRouter } from "next/router";
import { ButtonWrapper } from "./UpdateUserDetails.styles";

const UpdateUserDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loadedDetails, setLoadedDetails] = useState(null);
  const nameRef = useRef();
  const birthdayRef = useRef();
  const { dispatchError } = useError();
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      await axios
        .get("/api/user/info")
        .then(({ data }) => {
          setLoadedDetails(data);
          nameRef.current.value = data.name;
          birthdayRef.current.value = data.birthday;
        })
        .catch((e) => {
          setTimeout(() => {
            dispatchError(e.response.data.message);
            setIsLoading(false);
          }, 1200);
        });
    };
    getUserDetails();
  }, [dispatchError]);

  const profileImageHandler = async (e) => {
    await setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);

    reader.onload = async () => {
      await setProfileImage(reader.result);
    };
  };

  const userDetailsHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredName = nameRef.current.value;
    const enteredBirthdayName = birthdayRef.current.value;

    await axios
      .post("/api/auth/signup-details", {
        file: profileImage,
        name: enteredName,
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

  if (isLoading || !loadedDetails) {
    return <Loading />;
  }

  return (
    <Form onSubmit={userDetailsHandler}>
      {selectedFile ? (
        <ProfileImage src={URL.createObjectURL(selectedFile)} />
      ) : (
        <ProfileImage src={loadedDetails.profileImage} />
      )}
      <FileInput onChange={profileImageHandler} />
      <Input ref={nameRef} inputType="text" name="Name" required={false} />
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
        <RectangleButton onSubmit={userDetailsHandler}>Update</RectangleButton>
      </ButtonWrapper>
    </Form>
  );
};
export default UpdateUserDetails;
