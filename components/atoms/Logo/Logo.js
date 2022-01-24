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

  @media only screen and (min-width: ${({ theme }) => theme.size.l}) {
    width: 40vw;
    height: 100vh;
    position: sticky;
    top: 0;

    span {
      width: auto !important;
    }
  }
`;

const Logo = () => (
  <Wrapper>
    <Image src="/icons/logo.svg" alt="Logo" layout="fill" priority="true" />
  </Wrapper>
);

export default Logo;
