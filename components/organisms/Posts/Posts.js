import { useEffect, useState } from "react";
import Post from "../../molecules/Post/Post";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-top: 2rem;
  }
`;

const Posts = ({ posts, email, displayDelete }) => {
  const [postsArray, setPostsArray] = useState(posts);
  const { dispatchError } = useError();
  const router = useRouter();

  useEffect(() => {
    setPostsArray(posts);
  }, [posts]);

  const deletePostHandler = async (id) => {
    await axios
      .delete("/api/posts/delete-post", { data: { id } })
      .then(({ data }) => {
        setPostsArray(data.posts);
        router.reload();
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };

  return (
    <Wrapper>
      {postsArray.length !== 0 ? (
        postsArray.map((post) => (
          <Post
            key={post.id}
            post={post}
            email={email}
            isYourPost={email === post.email}
            onClick={() => deletePostHandler(post.id)}
            displayDelete={displayDelete}
          />
        ))
      ) : (
        <span>No posts</span>
      )}
    </Wrapper>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  displayDelete: PropTypes.bool.isRequired,
};

export default Posts;
