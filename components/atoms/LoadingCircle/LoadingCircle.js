import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 5rem;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 5rem;
    height: 5rem;
    border: 6px solid #2F4550;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #2F4550 transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const LoadingCircle = () => (
  <Wrapper>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Wrapper>
);

export default LoadingCircle;
