import { useState } from "react";
import debounce from "lodash.debounce";
import { useCombobox } from "downshift";
import { getSession } from "next-auth/react";
import { connectToDataBase } from "../../lib/db";
import MainTemplate from "../../components/templates/MainTemplate/MainTemplate";
import {
  ResultList,
  Wrapper,
} from "../../components/layouts/SearchPage.styles";
import Friend from "../../components/molecules/Friend/Friend";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import Event from "../../components/molecules/Event/Event";
import Head from "next/head";

const SearchPage = ({ userId, users, events }) => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [matchingEvents, setMatchingEvents] = useState([]);

  const getMatchingUsers = debounce(async ({ inputValue }) => {
    const filteredUsers = await users.filter((user) =>
      user.name.toLowerCase().startsWith(inputValue.toLowerCase()),
    );

    const filteredEvents = await events.filter((event) =>
      event.title.toLowerCase().startsWith(inputValue.toLowerCase()),
    );

    setMatchingUsers(filteredUsers);
    setMatchingEvents(filteredEvents);
  }, 500);

  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: matchingUsers,
    onInputValueChange: getMatchingUsers,
    itemToString: (item) => (item ? item.name : ""),
  });

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for users and events" />
      </Head>
      <MainTemplate userId={userId}>
        <Wrapper {...getComboboxProps()}>
          <input
            {...getInputProps()}
            name="Search"
            id="Search"
            placeholder="Search for users and events"
            type=" text"
          />
          <ResultList
            isVisible={matchingUsers.length > 0}
            {...getMenuProps()}
            aria-label="search"
          >
            {getInputProps().value !== "" &&
              matchingUsers.length > 0 &&
              matchingUsers.map((user, index) => (
                <Friend
                  isHighlighted={highlightedIndex === index}
                  {...getItemProps({
                    user,
                    index,
                  })}
                  key={user.userId}
                  friend={user}
                />
              ))}
          </ResultList>
          <ResultList
            isVisible={matchingEvents.length > 0}
            {...getMenuProps()}
            aria-label="search"
          >
            {getInputProps().value !== "" &&
              matchingEvents.length > 0 &&
              matchingEvents.map((event, index) => (
                <Event
                  isHighlighted={highlightedIndex === index}
                  {...getItemProps({
                    event,
                    index,
                  })}
                  key={event.id}
                  userId={event.userId}
                  event={event}
                  displayDelete={false}
                />
              ))}
          </ResultList>
        </Wrapper>
      </MainTemplate>
    </>
  );
};

SearchPage.propTypes = {
  userId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
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

  const users = await db.collection("users").find().toArray();

  const events = await db.collection("events").find().toArray();

  await client.close();

  return {
    props: {
      userId: session.user.id,
      users: users.map((user) => ({
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      })),
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

export default SearchPage;
