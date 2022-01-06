import { useRef } from "react";
import GreyWrapper from "../../molecules/GreyWrapper/GreyWrapper";
import Header from "../../atoms/Header/Header";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import FileInput from "../../atoms/FileInput/FileInput";
import Form from "../../molecules/Form/Form";
import { Wrapper } from "./CreatePost.styles";
import TextArea from "../../atoms/TextArea/TextArea";

const CreatePost = () => {
  const textareaRef = useRef();
  return (
    <GreyWrapper>
      <Wrapper>
        <Header>Create post</Header>
        <Form>
          <TextArea placeholder="What's on your mind?" ref={textareaRef} />
          <FileInput lightGrey text="Add" src="/icons/image.svg" />
          <RectangleButton lightGrey>Post</RectangleButton>
        </Form>
      </Wrapper>
    </GreyWrapper>
  );
};

export default CreatePost;
