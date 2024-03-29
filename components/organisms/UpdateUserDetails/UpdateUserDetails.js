import { useState, useRef, useEffect } from "react";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import FileInput from "../../atoms/FileInput/FileInput";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import LoadingComments from "../LoadingComments/LoadingComments";
import { useRouter } from "next/router";
import { ButtonWrapper, Wrapper } from "./UpdateUserDetails.styles";
import PropTypes from "prop-types";
import Image from "next/image";

const UpdateUserDetails = ({ profileImage, name, birthday }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const nameRef = useRef();
  const birthdayRef = useRef();
  const { dispatchError } = useError();
  const router = useRouter();

  useEffect(() => {
    nameRef.current.value = name;
    birthdayRef.current.value = birthday;
  }, [name, birthday]);

  const profileImageHandler = async (e) => {
    if (e.target.files[0]) {
      await setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      await reader.readAsDataURL(e.target.files[0]);

      reader.onload = async () => {
        await setNewProfileImage(reader.result);
      };
    }
  };

  const userDetailsHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredName = nameRef.current.value;
    const enteredBirthdayName = birthdayRef.current.value;

    await axios
      .patch("/api/user/update-user", {
        file: newProfileImage,
        name: enteredName,
        birthday: enteredBirthdayName,
      })
      .then((response) => {
        setIsLoading(false);
        router.replace("/");
      })
      .catch((e) => {
        setTimeout(() => {
          if (e.response.data.message === undefined) {
            dispatchError(e.response.data.message);
            setIsLoading(false);
          }
          dispatchError(e.response.data);
          setIsLoading(false);
        }, 1200);
      });
  };

  if (isLoading) {
    return <LoadingComments />;
  }

  return (
    <Wrapper>
      <Form onSubmit={userDetailsHandler}>
        {selectedFile ? (
          <ProfileImage src={URL.createObjectURL(selectedFile)} />
        ) : (
          <ProfileImage src={profileImage} />
        )}
        {selectedFile ? (
          <RectangleButton
            onClick={() => {
              setSelectedFile(null);
              setNewProfileImage(null);
            }}
          >
            <span>Remove</span>
            <Image src="/icons/image.svg" alt="image" width={20} height={20} />
          </RectangleButton>
        ) : (
          <FileInput
            text="Add profile image"
            onClick={(e) => (e.target.value = "")}
            onChange={profileImageHandler}
          />
        )}

        <Input ref={nameRef} inputType="text" name="Name" required={true} />
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
          <RectangleButton onSubmit={userDetailsHandler}>
            Update
          </RectangleButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

UpdateUserDetails.propTypes = {
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string,
};

export default UpdateUserDetails;
