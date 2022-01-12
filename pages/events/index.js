import { getSession } from "next-auth/react";
import { connectToDataBase } from "../../lib/db";
import MainTemplate from "../../components/templates/MainTemplate/MainTemplate";
import { StyledRectangleButton } from "../../components/layouts/EventsPage.styles";
import useModal from "../../hooks/useModal";
import Modal from "../../components/molecules/Modal/Modal";
import CreateEvent from "../../components/organisms/CreateEvent/CreateEvent";
import PropTypes from "prop-types";
import ErrorMessage from "../../components/molecules/ErrorMessage/ErrorMessage";
import { useError } from "../../hooks/useError";
import Events from "../../components/organisms/Events/Events";
import axios from "axios";

const EventsPage = ({ userId, events }) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { error } = useError();

  return (
    <MainTemplate userId={userId}>
      <StyledRectangleButton onClick={handleOpenModal}>
        Add event
      </StyledRectangleButton>
      <Events events={events} userId={userId} displayDelete={true} />
      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        <CreateEvent />
      </Modal>
      {error && <ErrorMessage message={error} />}
    </MainTemplate>
  );
};

EventsPage.prototype = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const { client, db } = await connectToDataBase();

  const existingUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (!existingUser) {
    context.res.status(404).json({ message: "User not found" });
    await client.close();
    return;
  }

  const events = await db
    .collection("events")
    .find()
    .sort({ date: 1 })
    .toArray();

  return {
    props: {
      userId: existingUser._id.toString(),
      events: events.map((event) => ({
        id: event._id.toString(),
        userId: event.userId.toString(),
        userName: event.userName,
        email: event.email,
        eventImage: event.eventImage,
        title: event.title,
        date: event.date,
        isBirthday: event.isBirthday,
      })),
      revalidate: 1,
    },
  };
};

export default EventsPage;
