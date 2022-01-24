import PropTypes from "prop-types";
import {
  FooterWrapper,
  InnerWrapper,
  LogoWrapper,
  Wrapper,
} from "./AuthTemplate.styles";
import Logo from "../../atoms/Logo/Logo";
import Footer from "../../atoms/Footer/Footer";

const AuthTemplate = ({ children }) => (
  <Wrapper>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <InnerWrapper>{children}</InnerWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </Wrapper>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
