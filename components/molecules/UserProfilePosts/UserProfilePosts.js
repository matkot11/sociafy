import { useState } from "react";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import Image from "next/image";
import Posts from "../../organisms/Posts/Posts";

const UserProfilePosts = ({ posts, email }) => {
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  return (
    <>
      <RectangleButton onClick={() => setIsPostsOpen(!isPostsOpen)} lightGrey>
        <span>Posts</span>
        {isPostsOpen ? (
          <Image
            src="/icons/arrow-down.svg"
            alt="Arrow"
            width={15}
            height={15}
          />
        ) : (
          <Image
            src="/icons/arrow-right.svg"
            alt="Arrow"
            width={15}
            height={15}
          />
        )}
      </RectangleButton>
      {isPostsOpen && <Posts posts={posts} email={email} />}
    </>
  );
};

export default UserProfilePosts;