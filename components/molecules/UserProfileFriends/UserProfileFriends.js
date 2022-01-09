import { useState } from "react";
import Image from "next/image";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import Friends from "../../organisms/Friends/Friends";

const UserProfileFriends = ({ friends }) => {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  return (
    <>
      <RectangleButton
        onClick={() => setIsFriendsOpen(!isFriendsOpen)}
        lightGrey
      >
        {/* {console.log(friends ? friends : "no friends")} */}
        <span>Friends</span>
        {isFriendsOpen ? (
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
      {isFriendsOpen && <Friends friends={friends} />}
    </>
  );
};

export default UserProfileFriends;
