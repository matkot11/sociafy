import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto 0 auto;
  width: 80%;
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > * {
    width: 45%;
  }
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
