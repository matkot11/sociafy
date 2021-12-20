import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  text-align: center;
  position: absolute;
  bottom: 1.5rem;
`;
const Footer = () => <StyledFooter>Mateusz Kocik &copy; 2022</StyledFooter>;

export default Footer;
