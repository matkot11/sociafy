import Link from "next/link";
import Footer from "../../atoms/Footer/Footer";
import IconTextLink from "../../atoms/IconTextLink/IconTextLink";
import { Wrapper } from "./Sidebar.styles";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    await router.push("/auth");
    await signOut();
  };

  return (
    <Wrapper>
      <div>
        <div>
          <Link href="/" passHref>
            <IconTextLink
              iconPath="/icons/home.svg"
              name="Main page"
              width={35}
              height={35}
            />
          </Link>
          <Link href="/" passHref>
            <IconTextLink
              iconPath="/icons/calendar.svg"
              name="Events"
              width={35}
              height={35}
            />
          </Link>
          <Link href="/" passHref>
            <IconTextLink
              iconPath="/icons/user-profile.svg"
              name="Profile"
              width={35}
              height={35}
            />
          </Link>
        </div>
        <div>
          <button onClick={logoutHandler}>
            <IconTextLink
              iconPath="/icons/logout.svg"
              name="Logout"
              width={35}
              height={35}
            />
          </button>
        </div>
      </div>
      <Footer isBlack={false} />
    </Wrapper>
  );
};

export default Sidebar;
