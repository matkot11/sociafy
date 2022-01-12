import { useState } from "react";
import Image from "next/image";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import Friends from "../../organisms/Friends/Friends";
import PropTypes from "prop-types";

const UserProfileFriends = ({ friends }) => {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  return (
    <>
      <RectangleButton
        onClick={() => setIsFriendsOpen(!isFriendsOpen)}
        lightGrey
      >
        <span>Friends</span>
        <Image
          src={
            isFriendsOpen ? "/icons/arrow-down.svg" : "/icons/arrow-right.svg"
          }
          alt="Arrow"
          width={15}
          height={15}
        />
      </RectangleButton>
      {isFriendsOpen && <Friends friends={friends} />}
    </>
  );
};

UserProfileFriends.propTypes = {
  friends: PropTypes.array.isRequired,
};

export default UserProfileFriends;
