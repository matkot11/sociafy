import { useState, useRef } from "react";
import Image from "next/image";
import GreyWrapper from "../../molecules/GreyWrapper/GreyWrapper";
import Header from "../../atoms/Header/Header";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import FileInput from "../../atoms/FileInput/FileInput";
import Form from "../../molecules/Form/Form";
import { Wrapper } from "./CreatePost.styles";
import TextArea from "../../atoms/TextArea/TextArea";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import { useRouter } from "next/router";
import LoadingCircle from "../../atoms/LoadingCircle/LoadingCircle";

const CreatePost = () => {
  const textareaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preparedFile, setPreparedFile] = useState(null);
  const { dispatchError } = useError();
  const router = useRouter();

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

  const createPostHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredText = textareaRef.current.value;

    await axios
      .post("/api/posts/add-post", {
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

  return (
    <GreyWrapper>
      <Wrapper>
        <Header>Create post</Header>
        <Form onSubmit={createPostHandler}>
          <TextArea placeholder="What's on your mind?" ref={textareaRef} />
          {selectedFile ? (
            <RectangleButton
              onClick={() => {
                setSelectedFile(null);
                setPreparedFile(null);
              }}
            >
              <span>Remove</span>
              <Image
                src="/icons/image.svg"
                alt="image"
                width={20}
                height={20}
              />
            </RectangleButton>
          ) : (
            <FileInput
              lightGrey
              text="Add"
              src="/icons/image.svg"
              onClick={(e) => (e.target.value = "")}
              onChange={fileHandler}
            />
          )}
          {selectedFile && (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file"
              width={50}
              height={50}
            />
          )}
          {isLoading ? (
            <LoadingCircle size={3} borderWeight={3} />
          ) : (
            <RectangleButton disabled={isLoading} lightGrey>
              Create post
            </RectangleButton>
          )}
        </Form>
      </Wrapper>
    </GreyWrapper>
  );
};

export default CreatePost;
