import Link from "next/link";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import styled from "styled-components";

const Wrapper = styled.div`
  //width: 90%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  span {
    margin-left: 1rem;
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }
`;

const Friend = ({ friend }) => (
  <Link href={`/user/${friend.userId}`} passHref>
    <Wrapper>
      <ProfileImage src={friend.profileImage} width={50} height={50} />
      <span>{friend.name}</span>
    </Wrapper>
  </Link>
);

export default Friend;
