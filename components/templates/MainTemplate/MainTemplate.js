import PropTypes from "prop-types";
import Navbar from "../../organisms/Navbar/Navbar";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import {
  InnerWrapper,
  NavbarWrapper,
  SidebarWrapper,
  Wrapper,
} from "./MainTemplate.styles";

const MainTemplate = ({ children, userId }) => (
  <Wrapper>
    <NavbarWrapper>
      <Navbar userId={userId} />
    </NavbarWrapper>
    <SidebarWrapper>
      <Sidebar userId={userId} />
    </SidebarWrapper>
    <InnerWrapper>{children}</InnerWrapper>
  </Wrapper>
);

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MainTemplate;
