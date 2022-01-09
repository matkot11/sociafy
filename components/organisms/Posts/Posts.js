import { useEffect, useState } from "react";
import Post from "../../molecules/Post/Post";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 1rem 0 1rem 0;
  }
`;

const Posts = ({ posts, email }) => {
  const [postsArray, setPostsArray] = useState(posts);
  const { dispatchError } = useError();

  useEffect(() => {
    setPostsArray(posts);
  }, [posts]);

  const deletePostHandler = async (id) => {
    await axios
      .delete("/api/posts/delete-post", { data: { id } })
      .then(({ data }) => {
        setPostsArray(data.posts);
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
          />
        ))
      ) : (
        <span>No posts</span>
      )}
    </Wrapper>
  );
};

export default Posts;
