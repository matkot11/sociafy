import { forwardRef } from "react";
import Form from "../../molecules/Form/Form";
import RectangleButton from "../RectangleButton/RectangleButton";
import styled from "styled-components";
import TextArea from "../TextArea/TextArea";

const Wrapper = styled.div`
  width: 80%;
`;

const AddComment = forwardRef(({ onSubmit }, ref) => (
  <Wrapper>
    <Form onSubmit={onSubmit}>
      <TextArea textAreaHeight="10rem" placeholder="Comment" ref={ref} />
      <RectangleButton lightGrey>Add comment</RectangleButton>
    </Form>
  </Wrapper>
));

AddComment.displayName = "AddComment";

export default AddComment;
