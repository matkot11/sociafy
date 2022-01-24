import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    align-items: start;
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

  & > * {
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const NavbarWrapper = styled.div`
  z-index: 2;
  position: sticky;
  top: 0;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    grid-column: 1/-1;
    grid-row: 1;
  }
`;

export const SidebarWrapper = styled.div`
  z-index: 1;
  grid-column: 1;
  grid-row: 1/-1;
  display: none;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    display: block;
    position: sticky;
    top: 0;
  }
`;
