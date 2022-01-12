import Link from "next/link";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import PropTypes from "prop-types";
import { DeleteButtonWrapper, Wrapper } from "./Event.styles";
import Icon from "../../atoms/Icon/Icon";
import axios from "axios";

const Event = ({ event, userId, onClick, displayDelete }) => (
  <>
    <Wrapper>
      <Link href={`/events/${event.id}`} passHref>
        <div>
          <ProfileImage src={event.eventImage} width={50} height={50} />
          <div>
            <span>{event.title}</span>
            <span>{event.date}</span>
          </div>
        </div>
      </Link>
      {displayDelete && !event.isBirthday && event.userId === userId && (
        <Icon
          onClick={onClick}
          name="Bin"
          iconPath="/icons/bin.svg"
          width={24}
          height={24}
        />
      )}
    </Wrapper>
  </>
);

Event.propTypes = {
  event: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  displayDelete: PropTypes.bool.isRequired,
};

export default Event;
