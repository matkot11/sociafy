import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  position: relative;

  &:hover,
  &:active {
    div {
      display: block;
    }
  }

  div {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 10;
  }
`;
