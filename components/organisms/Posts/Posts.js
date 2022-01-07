import Post from "../../molecules/Post/Post";

const Posts = ({ posts, session }) => (
  <>
    {posts.map((post) => (
      <Post key={post.id} post={post} session={session} />
    ))}
  </>
);

export default Posts;
