import { Wrapper } from "./Navbar.styles";
import NavbarButtons from "../../molecules/NavbarButtons/NavbarButtons";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NavbarTop from "../../molecules/NavbarTop/NavbarTop";
import PropTypes from "prop-types";

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

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Navbar;
