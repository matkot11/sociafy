import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: max-content 1fr;
  }
`;

export const InnerWrapper = styled.div`
  padding: 2rem 0 8rem 0;
  max-width: 60rem;
  width: 100%;
  justify-self: center;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 100%;

  & > * {
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const NavbarWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    grid-column: 1/-1;
    grid-row: 1;
  }
`;

export const SidebarWrapper = styled.div`
  display: none;
  align-self: stretch;
  overflow: scroll;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    grid-column: 1;
    grid-row: 2;
    display: block;
  }
`;
