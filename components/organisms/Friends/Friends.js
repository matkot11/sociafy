import Friend from "../../molecules/Friend/Friend";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-top: 2rem;
  }
`;

const Friends = ({ friends }) => (
  <Wrapper>
    {friends.length !== 0 ? (
      friends.map((friend) => <Friend key={friend.id} friend={friend} />)
    ) : (
      <span>No friends</span>
    )}
  </Wrapper>
);

export default Friends;
