import { useState, useRef } from "react";
import Image from "next/image";
import GreyWrapper from "../../molecules/GreyWrapper/GreyWrapper";
import Header from "../../atoms/Header/Header";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import FileInput from "../../atoms/FileInput/FileInput";
import Form from "../../molecules/Form/Form";
import { Wrapper } from "./CreatePost.styles";
import TextArea from "../../atoms/TextArea/TextArea";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import useModal from "../../../hooks/useModal";
import { useRouter } from "next/router";

const CreatePost = () => {
  const textareaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preparedFile, setPreparedFile] = useState(null);
  const { dispatchError } = useError();
  const { handleCloseModal } = useModal();
  const router = useRouter();

  const fileHandler = async (e) => {
    await setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    await reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      await setPreparedFile(reader.result);
    };
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredText = textareaRef.current.value;

    await axios
      .post("/api/posts/create-post", {
        image: preparedFile,
        text: enteredText,
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GreyWrapper>
      <Wrapper>
        <Header>Create post</Header>
        <Form onSubmit={createPostHandler}>
          <TextArea placeholder="What's on your mind?" ref={textareaRef} />
          <FileInput
            lightGrey
            text="Add"
            src="/icons/image.svg"
            onChange={fileHandler}
          />
          {selectedFile && (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file"
              width={50}
              height={50}
            />
          )}
          <RectangleButton lightGrey>Post</RectangleButton>
        </Form>
        <button onClick={handleCloseModal}>CLOSE</button>
      </Wrapper>
    </GreyWrapper>
  );
};

export default CreatePost;
