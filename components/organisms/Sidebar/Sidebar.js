import Link from "next/link";
import Footer from "../../atoms/Footer/Footer";
import IconTextLink from "../../atoms/IconTextLink/IconTextLink";
import { CloseButton, Wrapper } from "./Sidebar.styles";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Icon from "../../atoms/Icon/Icon";
import IconTextButton from "../../atoms/IconTextButton/IconTextButton";
import PropTypes from "prop-types";

const Sidebar = ({ onClick, userId }) => {
  const router = useRouter();

  const logoutHandler = async () => {
    await router.push("/auth");
    await signOut();
  };

  return (
    <Wrapper>
      <CloseButton onClick={onClick}>
        <Icon
          iconPath="/icons/close.svg"
          name="Close"
          imageWidth={24}
          imageHeight={24}
        />
      </CloseButton>
      <div>
        <div>
          <Link href="/" passHref>
            <IconTextLink
              iconPath="/icons/home.svg"
              name="Main page"
              imageWidth={30}
              imageHeight={30}
            />
          </Link>
          <Link href="/search" passHref>
            <IconTextLink
              iconPath="/icons/magnifier.svg"
              name="Search"
              imageWidth={30}
              imageHeight={30}
            />
          </Link>
          <Link href="/events" passHref>
            <IconTextLink
              iconPath="/icons/calendar.svg"
              name="Events"
              imageWidth={30}
              imageHeight={30}
            />
          </Link>
          <Link href={`/user/${userId}`} passHref>
            <IconTextLink
              iconPath="/icons/user-profile.svg"
              name="Profile"
              imageWidth={30}
              imageHeight={30}
            />
          </Link>
          <Link href={`/user-details`} passHref>
            <IconTextLink
              iconPath="/icons/pen.svg"
              name="User profile"
              imageWidth={24}
              imageHeight={24}
            />
          </Link>
        </div>
        <div>
          <IconTextButton
            onClick={logoutHandler}
            src="/icons/logout.svg"
            name="Logout"
            imageWidth={30}
            imageHeight={30}
            fontWeight={400}
          />
          <Footer isBlack={false} />
        </div>
      </div>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  onClick: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

export default Sidebar;
