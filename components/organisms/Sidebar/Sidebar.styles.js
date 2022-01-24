import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.darkGreen};

  button {
    color: white;
  }

  div {
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    div {
      height: max-content;

      &:first-child {
        & > * {
          margin: 1rem 0 1rem 0;
        }
      }
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    position: sticky;
    top: 0;
    padding: 0 4rem 0 4rem;
    min-height: 100vh;
    width: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    display: none;
  }
`;
