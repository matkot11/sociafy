import { Wrapper } from "./Navbar.styles";
import Image from "next/image";
import IconLink from "../../atoms/IconLink/IconLink";
import NavbarButtons from "../../molecules/NavbarButtons/NavbarButtons";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NavbarTop from "../../molecules/NavbarTop/NavbarTop";

const Navbar = ({ userId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Wrapper>
      <NavbarTop onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <NavbarButtons userId={userId} />
      {isSidebarOpen && (
        <Sidebar
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userId={userId}
        />
      )}
    </Wrapper>
  );
};

export default Navbar;
