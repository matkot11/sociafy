import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 3rem !important;
  }

  span:nth-child(2) {
    transform: rotateY(180deg);
  }
`;
