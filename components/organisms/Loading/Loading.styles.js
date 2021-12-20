import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(4rem);
  }
`;

const loadingAnimationSecondChild = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) rotateY(180deg);
  }

  to {
    opacity: 0;
    transform: translateY(4rem) rotateY(180deg);
  }
`;

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

  span:nth-child(1) {
    animation: ${loadingAnimation} 1.5s ease-in infinite;
  }

  span:nth-child(2) {
    animation: ${loadingAnimationSecondChild} 1.5s ease-in infinite;
  }

  span:nth-child(3) {
    animation: ${loadingAnimation} 1.5s ease-in infinite;
  }
`;
