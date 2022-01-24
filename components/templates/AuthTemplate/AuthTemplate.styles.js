import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr max-content;

  @media only screen and (min-width: ${({ theme }) => theme.size.l}) {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr max-content;
  }
`;

export const LogoWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.size.l}) {
    grid-column: 1;
    grid-row: 1/-1;
    position: sticky;
    top: 0;
    height: 100%;
  }
`;

export const InnerWrapper = styled.div`
  margin-top: 2rem;
  width: 80%;
  justify-self: center;
  transition: all 0.5s;

  @media only screen and (min-width: ${({ theme }) => theme.size.xxs}) {
    max-width: 40rem;
  }

  @media only screen and (min-width: ${({ theme }) => theme.size.l}) {
    padding: 1rem;
    margin-top: 0;
    grid-column: 2;
    grid-row: 1;
    align-self: center;
  }
`;

export const FooterWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.size.l}) {
    grid-column: 2;
    grid-row: 2;
  }
`;
