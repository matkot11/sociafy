import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-bottom: 1.5rem;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  text-align: center;
`;
const Footer = () => <StyledFooter>Mateusz Kocik &copy; 2022</StyledFooter>;

export default Footer;
