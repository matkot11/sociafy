import { useState } from "react";
import Image from "next/image";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";
import Friends from "../../organisms/Friends/Friends";
import PropTypes from "prop-types";
import Events from "../../organisms/Events/Events";

const UserProfileEvents = ({ events, userId }) => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  return (
    <>
      <RectangleButton onClick={() => setIsEventsOpen(!isEventsOpen)} lightGrey>
        <span>Events</span>
        <Image
          src={
            isEventsOpen ? "/icons/arrow-down.svg" : "/icons/arrow-right.svg"
          }
          alt="Arrow"
          width={15}
          height={15}
        />
      </RectangleButton>
      {isEventsOpen && (
        <Events events={events} userId={userId} displayDelete={false} />
      )}
    </>
  );
};

UserProfileEvents.propTypes = {
  events: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

export default UserProfileEvents;
