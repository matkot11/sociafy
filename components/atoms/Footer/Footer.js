import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFooter = styled.footer`
  margin-bottom: 1.5rem;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  text-align: center;
  color: ${({ isBlack, theme }) =>
    isBlack ? theme.color.black : theme.color.lightGrey};
`;
const Footer = ({ isBlack = true }) => (
  <StyledFooter isBlack={isBlack}>Mateusz Kocik &copy; 2022</StyledFooter>
);

Footer.propTypes = {
  isBlack: PropTypes.bool,
};

export default Footer;
