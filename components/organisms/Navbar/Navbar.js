import { UpperInnerWrapper, Wrapper } from "./Navbar.styles";
import Image from "next/image";
import IconLink from "../../atoms/IconLink/IconLink";
import NavbarButtons from "../../molecules/NavbarButtons/NavbarButtons";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Wrapper>
      <UpperInnerWrapper>
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          layout="fixed"
          width={100}
          height={30}
        />
        <div>
          <button>
            <IconLink
              iconPath="/icons/magnifier.svg"
              name="Magnifier"
              width={24}
              height={24}
            />
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <IconLink
              iconPath="/icons/menu.svg"
              name="Menu"
              width={24}
              height={24}
            />
          </button>
        </div>
      </UpperInnerWrapper>
      {isSidebarOpen ? <Sidebar /> : <NavbarButtons />}
    </Wrapper>
  );
};

export default Navbar;
