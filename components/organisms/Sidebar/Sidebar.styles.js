import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: calc(100vh - 4rem);
  bottom: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.darkGreen};

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
          margin: 0.8rem 0 0.8rem 0;
        }
      }
    }
  }
`;
