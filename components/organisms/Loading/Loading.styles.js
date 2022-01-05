import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto 0 auto;
  max-width: 100vw;
  height: 100%;
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
