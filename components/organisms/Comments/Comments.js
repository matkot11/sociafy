import { useEffect, useState } from "react";
import Comment from "../../molecules/Comment/Comment";
import styled from "styled-components";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 2rem 1rem 2rem;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span:last-child {
    width: 100%;
    text-align: center;
  }

  & > * {
    margin: 1rem 0 1rem 0;
  }
`;

const Comments = ({ comments, email, postId }) => {
  const [commentsArray, setCommentsArray] = useState(comments);
  const { dispatchError } = useError();

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
            isYourComment={email === comment.email}
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

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Comments;
