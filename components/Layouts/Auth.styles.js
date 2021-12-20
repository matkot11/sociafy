import styled, { keyframes } from "styled-components";

const showUp = keyframes`
  from {
    transform: translateY(-2rem);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const InnerWrapper = styled.div`
  margin-top: 2rem;
  width: 80%;
  justify-self: center;
  transition: all 0.5s;
`;

export const LoginWrapper = styled.div`
  display: ${({ isOpenLogin }) => (isOpenLogin ? "block" : "none")};
  animation: ${showUp} 0.5s ease-in-out forwards;
`;

export const RegisterWrapper = styled.div`
  display: ${({ isOpenLogin }) => (isOpenLogin ? "none" : "block")};
  animation: ${showUp} 0.5s ease-in-out forwards;
`;
