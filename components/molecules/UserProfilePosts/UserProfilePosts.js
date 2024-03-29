import { useState } from "react";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import Image from "next/image";
import Posts from "../../organisms/Posts/Posts";
import PropTypes from "prop-types";

const UserProfilePosts = ({ posts, email }) => {
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  return (
    <>
      <RectangleButton onClick={() => setIsPostsOpen(!isPostsOpen)} lightGrey>
        <span>Posts</span>

        <Image
          src={isPostsOpen ? "/icons/arrow-down.svg" : "/icons/arrow-right.svg"}
          alt="Arrow"
          width={15}
          height={15}
        />
      </RectangleButton>
      {isPostsOpen && (
        <Posts posts={posts} email={email} displayDelete={false} />
      )}
    </>
  );
};

UserProfilePosts.propTypes = {
  posts: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserProfilePosts;
