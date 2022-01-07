import { useEffect, useState } from "react";
import Comment from "../../atoms/Comment/Comment";
import styled from "styled-components";
import axios from "axios";
import { useError } from "../../../hooks/useError";

const Wrapper = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  align-self: flex-end;

  & > * {
    margin: 1rem 0 1rem 0;
  }
`;

const Comments = ({ comments, session, postId }) => {
  const [commentsArray, setCommentsArray] = useState(comments);
  const { dispatchError } = useError();
  console.log(comments);

  useEffect(() => {
    setCommentsArray(comments);
  }, [comments]);

  const deleteCommentHandler = async (comment) => {
    await axios
      .delete("api/posts/delete-comment-post", {
        data: {
          comment,
          postId,
        },
      })
      .then(({ data }) => {
        setCommentsArray(data.comments);
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };
  return (
    <Wrapper>
      {commentsArray.length > 0 ? (
        commentsArray.map((comment) => (
          <Comment
            onClick={() => deleteCommentHandler(comment)}
            isYourComment={session.user.email === comment.email}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <span>No comments</span>
      )}
    </Wrapper>
  );
};

export default Comments;
