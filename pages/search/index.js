import { useState } from "react";
import debounce from "lodash.debounce";
import { useCombobox } from "downshift";
import { getSession } from "next-auth/react";
import { connectToDataBase } from "../../lib/db";
import MainTemplate from "../../components/templates/MainTemplate/MainTemplate";
import {
  ResultItem,
  ResultList,
  Wrapper,
} from "../../components/layouts/SearchPage.styles";
import Friend from "../../components/molecules/Friend/Friend";

const SearchPage = ({ userId, users }) => {
  const [matchingUsers, setMatchingUsers] = useState([]);

  const getMatchingUsers = debounce(async ({ inputValue }) => {
    const filteredUsers = await users.filter((user) =>
      user.name.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
    setMatchingUsers(filteredUsers);
  }, 500);

  const {
    isOpen,
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
    <MainTemplate userId={userId}>
      <Wrapper {...getComboboxProps()}>
        <input
          {...getInputProps()}
          name="Search"
          id="Search"
          placeholder="Search users"
          type=" text"
        />
        <ResultList
          isVisible={matchingUsers.length > 0}
          {...getMenuProps()}
          aria-label=" search"
        >
          {matchingUsers.length > 0 &&
            getInputProps().value !== "" &&
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
      </Wrapper>
    </MainTemplate>
  );
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
      revalidate: 1,
    },
  };
};

export default SearchPage;
