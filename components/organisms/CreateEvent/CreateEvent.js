import { useState, useRef } from "react";
import Input from "../../atoms/Input/Input";
import Form from "../../molecules/Form/Form";
import TextArea from "../../atoms/TextArea/TextArea";
import FileInput from "../../atoms/FileInput/FileInput";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import GreyWrapper from "../../molecules/GreyWrapper/GreyWrapper";
import { ImageWrapper, Wrapper } from "./CreateEvent.styles";
import Header from "../../atoms/Header/Header";
import LoadingComments from "../LoadingComments/LoadingComments";
import axios from "axios";
import { useRouter } from "next/router";
import { useError } from "../../../hooks/useError";
import Image from "next/image";
import LoadingCircle from "../../atoms/LoadingCircle/LoadingCircle";
import Icon from "../../atoms/Icon/Icon";

const CreateEvent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preparedFile, setPreparedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const router = useRouter();
  const { dispatchError } = useError();

  const fileHandler = async (e) => {
    if (e.target.files[0]) {
      await setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      await reader.readAsDataURL(e.target.files[0]);
      reader.onload = async () => {
        await setPreparedFile(reader.result);
      };
    }
  };

  const addEventHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const enteredTitle = titleRef.current.value;
    const enteredDate = dateRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    await axios
      .post("/api/events/add-event", {
        file: preparedFile,
        title: enteredTitle,
        date: enteredDate,
        description: enteredDescription,
      })
      .then((response) => {
        router.reload();
        setIsLoading(false);
      })
      .catch((e) => {
        setTimeout(() => {
          if (e.response.data.message !== undefined) {
            dispatchError(e.response.data.message);
          } else {
            dispatchError(e.response.data);
          }
          setIsLoading(false);
        }, 1200);
      });
  };

  return (
    <GreyWrapper>
      <Wrapper>
        <Header>Create Event</Header>
        <Form onSubmit={addEventHandler}>
          <Input ref={titleRef} inputType="text" name="Title" required={true} />
          <Input ref={dateRef} inputType="date" name="Date" required={true} />
          <TextArea ref={descriptionRef} placeholder="What's on your mind?" />
          <FileInput
            lightGrey
            text="Add"
            src="/icons/image.svg"
            onClick={(e) => (e.target.value = "")}
            onChange={fileHandler}
          />
          {selectedFile && (
            <ImageWrapper>
              <div>
                <Icon
                  onClick={() => {
                    setSelectedFile(null);
                    setPreparedFile(null);
                  }}
                  iconPath="/icons/close.svg"
                  name="close"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Selected file"
                width={50}
                height={50}
              />
            </ImageWrapper>
          )}
          {isLoading ? (
            <LoadingCircle />
          ) : (
            <RectangleButton disabled={isLoading} lightGrey>
              Create event
            </RectangleButton>
          )}
        </Form>
      </Wrapper>
    </GreyWrapper>
  );
};

export default CreateEvent;
