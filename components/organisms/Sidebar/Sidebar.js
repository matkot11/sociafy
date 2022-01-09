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
        <Icon iconPath="/icons/close.svg" name="Close" width={24} height={24} />
      </CloseButton>
      <div>
        <div>
          <Link href="/" passHref>
            <IconTextLink
              iconPath="/icons/home.svg"
              name="Main page"
              imageWidth={35}
              imageHeight={35}
            />
          </Link>
          <Link href="/" passHref>
            <IconTextLink
              iconPath="/icons/calendar.svg"
              name="Events"
              imageWidth={35}
              imageHeight={35}
            />
          </Link>
          <Link href={`/user/${userId}`} passHref>
            <IconTextLink
              iconPath="/icons/user-profile.svg"
              name="Profile"
              imageWidth={35}
              imageHeight={35}
            />
          </Link>
        </div>
        <div>
          <IconTextButton
            onClick={logoutHandler}
            src="/icons/logout.svg"
            name="Logout"
            imageWidth={35}
            imageHeight={35}
            fontWeight={400}
          />
        </div>
      </div>
      <Footer isBlack={false} />
    </Wrapper>
  );
};

Sidebar.propTypes = {
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Sidebar;
