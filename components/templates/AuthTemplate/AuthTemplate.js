import PropTypes from "prop-types";
import { InnerWrapper, Wrapper } from "./AuthTemplate.styles";
import Logo from "../../atoms/Logo/Logo";
import Footer from "../../atoms/Footer/Footer";

const AuthTemplate = ({ children }) => (
  <Wrapper>
    <Logo />
    <InnerWrapper>{children}</InnerWrapper>
    <Footer />
  </Wrapper>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
