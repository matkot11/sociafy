import { useEffect, useState } from "react";
import { connectToDataBase } from "../../../lib/db";
import { useSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import ErrorMessage from "../../../components/molecules/ErrorMessage/ErrorMessage";
import MainTemplate from "../../../components/templates/MainTemplate/MainTemplate";
import Loading from "../../../components/organisms/Loading/Loading";
import GreyWrapper from "../../../components/molecules/GreyWrapper/GreyWrapper";
import ProfileImage from "../../../components/atoms/ProfileImage/ProfileImage";
import RectangleButton from "../../../components/atoms/RectangleButton/RectangleButton";
import PropTypes from "prop-types";
import {
  ButtonWrapper,
  CreatedBy,
  Date,
  DeleteButtonWrapper,
  Description,
  ImageWrapper,
  Title,
  Wrapper,
} from "../../../components/layouts/EventPage.styles";
import Image from "next/image";
import Friends from "../../../components/organisms/Friends/Friends";
import Icon from "../../../components/atoms/Icon/Icon";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";

const EventPage = ({ event }) => {
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [participants, setParticipants] = useState(null);
  const [areYouParticipant, setAreYouParticipant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const { dispatchError, error } = useError();
  const router = useRouter();

  useEffect(() => {
    if (session && event && event.participants) {
      if (
        event.participants &&
        event.participants
          .map((participant) => participant.email)
          .includes(session.user.email)
      ) {
        setAreYouParticipant(true);
      } else {
        setAreYouParticipant(false);
      }
      setParticipants(event.participants);
    }
  }, [dispatchError, session, event, event.participants]);

  const participateButtonHandler = async () => {
    await axios
      .post("/api/events/add-participant", { eventId: event.id })
      .then(({ data }) => {
        setParticipants(data.participants);
        setAreYouParticipant(data.areYouParticipant);
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };

  const deleteEventHandler = async () => {
    setIsLoading(true);
    await axios
      .delete("/api/events/delete-event", {
        data: {
          id: event.id,
        },
      })
      .then(() => {
        router.back();
        setIsLoading(false);
      })
      .catch((e) => {
        setTimeout(() => {
          setIsLoading(false);
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };

  if (status === "loading" || isLoading || router.isFallback) {
    return <Loading />;
  }

  return (
    <MainTemplate userId={session.user.id}>
      <GreyWrapper>
        <Wrapper>
          {!event.isBirthday && event.userId === session.user.id && (
            <DeleteButtonWrapper>
              <Icon
                onClick={deleteEventHandler}
                name="Bin"
                iconPath="/icons/bin.svg"
                imageWidth={24}
                imageHeight={24}
              />
            </DeleteButtonWrapper>
          )}
          <ImageWrapper>
            <ProfileImage src={event.eventImage} width={115} height={115} />
          </ImageWrapper>
          <Title>{event.title}</Title>
          <Date>{event.date}</Date>
          <Description>{event.description}</Description>
          {!event.isBirthday && (
            <CreatedBy>Event created by {event.userName}</CreatedBy>
          )}
          {!event.isBirthday && (
            <ButtonWrapper>
              <RectangleButton onClick={participateButtonHandler} lightGrey>
                {areYouParticipant ? "Leave event" : "Join event"}
              </RectangleButton>
              <RectangleButton
                onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                lightGrey
              >
                <span>Participants</span>
                <Image
                  src={
                    isParticipantsOpen
                      ? "/icons/arrow-down.svg"
                      : "/icons/arrow-right.svg"
                  }
                  alt="Arrow"
                  width={15}
                  height={15}
                />
              </RectangleButton>
            </ButtonWrapper>
          )}
          {isParticipantsOpen && (
            <Friends friends={participants} emptyText="No participants" />
          )}
        </Wrapper>
      </GreyWrapper>
      {error && <ErrorMessage message={error} />}
    </MainTemplate>
  );
};

EventPage.propTypes = {
  event: PropTypes.object.isRequired,
};

export const getStaticPaths = async () => {
  const { client, db } = await connectToDataBase();

  const events = await db.collection("events").find().toArray();

  await client.close();

  return {
    paths: events.map((user) => ({
      params: { eventId: user._id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const { client, db } = await connectToDataBase();

  const event = await db
    .collection("events")
    .findOne({ _id: ObjectId(eventId) });

  if (!event) {
    await client.close();
    return { notFound: true };
  }

  await client.close();

  return {
    props: {
      event: {
        id: event._id.toString(),
        userId: event.userId.toString(),
        userName: event.userName,
        email: event.email,
        eventImage: event.eventImage,
        title: event.title,
        date: format(parseISO(event.date), "PPP"),
        description: event.description,
        isBirthday: event.isBirthday,
        participants: event.participants.map((participant) => ({
          id: participant.id.toString(),
          userId: participant.userId.toString(),
          email: participant.email,
          name: participant.name,
          profileImage: participant.profileImage,
        })),
      },
    },
    revalidate: 1,
  };
};

export default EventPage;
