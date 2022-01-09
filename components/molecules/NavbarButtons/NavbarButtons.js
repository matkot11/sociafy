import Link from "next/link";
import IconsLink from "../../atoms/IconLink/IconLink";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const NavbarButtons = ({ userId }) => (
  <Wrapper>
    <Link href="/" passHref>
      <IconsLink
        iconPath="/icons/home.svg"
        name="Home"
        width={24}
        height={24}
      />
    </Link>
    <Link href="/" passHref>
      <IconsLink
        iconPath="/icons/calendar.svg"
        name="Events"
        width={24}
        height={24}
      />
    </Link>
    <Link href={`/user/${userId}`} passHref>
      <IconsLink
        iconPath="/icons/user-profile.svg"
        name="User profile"
        width={24}
        height={24}
      />
    </Link>
    <Link href={`/user-details`} passHref>
      <IconsLink
        iconPath="/icons/pen.svg"
        name="User profile"
        width={24}
        height={24}
      />
    </Link>
  </Wrapper>
);

export default NavbarButtons;
