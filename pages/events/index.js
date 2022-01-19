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
import { format, parseISO } from "date-fns";
import Head from "next/head";

const EventsPage = ({ userId, events }) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const { error } = useError();

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="Find and add events" />
      </Head>
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
    </>
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

  const events = await db
    .collection("events")
    .find()
    .sort({ date: 1 })
    .toArray();

  await client.close();

  return {
    props: {
      userId: session.user.id,
      events: events.map((event) => ({
        id: event._id.toString(),
        userId: event.userId.toString(),
        userName: event.userName,
        email: event.email,
        eventImage: event.eventImage,
        title: event.title,
        date: format(parseISO(event.date), "PP"),
        isBirthday: event.isBirthday,
      })),
      revalidate: 1,
    },
  };
};

export default EventsPage;
