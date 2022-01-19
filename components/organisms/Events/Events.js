import { useState } from "react";
import Event from "../../molecules/Event/Event";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { useError } from "../../../hooks/useError";
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

const Events = ({ events, userId, displayDelete }) => {
  const [eventsArray, setEventsArray] = useState(events);
  const { dispatchError } = useError();
  const router = useRouter();

  const deleteEventHandler = async (id) => {
    await axios
      .delete("/api/events/delete-event", {
        data: {
          id,
        },
      })
      .then(({ data }) => {
        setEventsArray(data.events);
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
      {eventsArray.map((event) => (
        <Event
          key={event.id}
          event={event}
          userId={userId}
          onClick={() => deleteEventHandler(event.id)}
          displayDelete={displayDelete}
        />
      ))}
    </Wrapper>
  );
};

Events.propTypes = {
  events: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  displayDelete: PropTypes.bool.isRequired,
};

export default Events;
