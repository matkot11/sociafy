import PropTypes from "prop-types";
import { Wrapper } from "./AuthTemplate.styles";
import Logo from "../../atoms/Logo/Logo";
import Footer from "../../atoms/Footer/Footer";

const AuthTemplate = ({ children }) => (
  <Wrapper>
    <Logo />
    {children}
    <Footer />
  </Wrapper>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
