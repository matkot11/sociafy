import Friend from "../../molecules/Friend/Friend";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-top: 2rem;
  }
`;

const Friends = ({ friends, emptyText = "No friends" }) => (
  <Wrapper>
    {friends.length !== 0 ? (
      friends.map((friend) => <Friend key={friend.id} friend={friend} />)
    ) : (
      <span>{emptyText}</span>
    )}
  </Wrapper>
);

Friends.propTypes = {
  friends: PropTypes.array.isRequired,
  emptyText: PropTypes.string,
};

export default Friends;
