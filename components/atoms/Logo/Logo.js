import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.darkGreen};
  width: 100vw;
  height: 25vh;

  span {
    margin: auto !important;
    width: 60vw !important;
    height: 10rem !important;
  }
`;

const Logo = () => (
  <Wrapper>
    <Image src="/icons/logo.svg" alt="Logo" layout="fill" priority="true" />
  </Wrapper>
);

export default Logo;
