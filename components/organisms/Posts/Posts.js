import { useEffect, useState } from "react";
import Post from "../../molecules/Post/Post";
import axios from "axios";
import { useError } from "../../../hooks/useError";

const Posts = ({ posts, session }) => {
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
    <>
      {postsArray.map((post) => (
        <Post
          key={post.id}
          post={post}
          session={session}
          isYourPost={session.user.email === post.email}
          onClick={() => deletePostHandler(post.id)}
        />
      ))}
    </>
  );
};

export default Posts;
