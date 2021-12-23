import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 7rem;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background-color: white;

  p {
    padding: 2rem;
    margin: auto;
    width: max-content;
  }

  div {
    background-color: white;
    & > * {
      position: absolute;
      width: 0;
      height: 0;
    }

    span:nth-child(1) {
      left: 0;
      bottom: 0;
      height: 100%;
      width: 2px;
    }

    span:nth-child(2) {
      top: 0;
      left: 0;
      width: 50%;
      height: 2px;
      transform: rotate(180deg);
    }

    span:nth-child(3) {
      top: 0;
      right: 0;
      width: 50%;
      height: 2px;
    }

    span:nth-child(4) {
      right: 0;
      bottom: 0;
      height: 100%;
      width: 2px;
    }

    span:nth-child(5) {
      bottom: 0;
      right: 50%;
      width: 50%;
      height: 2px;
    }

    span:nth-child(6) {
      bottom: 0;
      left: 50%;
      width: 50%;
      height: 2px;
    }
  }
`;
