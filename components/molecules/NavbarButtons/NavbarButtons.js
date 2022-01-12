import Link from "next/link";
import Icon from "../../atoms/Icon/Icon";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const NavbarButtons = ({ userId }) => (
  <Wrapper>
    <Link href="/" passHref>
      <Icon
        iconPath="/icons/home.svg"
        name="Home"
        imageWidth={24}
        imageHeight={24}
      />
    </Link>
    <Link href="/events" passHref>
      <Icon
        iconPath="/icons/calendar.svg"
        name="Events"
        imageWidth={24}
        imageHeight={24}
      />
    </Link>
    <Link href={`/user/${userId}`} passHref>
      <Icon
        iconPath="/icons/user-profile.svg"
        name="User profile"
        imageWidth={24}
        imageHeight={24}
      />
    </Link>
    <Link href={`/user-details`} passHref>
      <Icon
        iconPath="/icons/pen.svg"
        name="User profile"
        imageWidth={24}
        imageHeight={24}
      />
    </Link>
  </Wrapper>
);

NavbarButtons.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default NavbarButtons;
