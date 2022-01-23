import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ size }) => (size ? size + "rem" : "5rem")};
  height: ${({ size }) => (size ? size + "rem" : "5rem")};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => (size ? size + "rem" : "5rem")};
    height: ${({ size }) => (size ? size + "rem" : "5rem")};
    border: ${({ borderWeight }) =>
      borderWeight ? borderWeight + "px solid #2F4550" : "4px solid #2F4550"};
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
const LoadingCircle = ({ size, borderWeight }) => (
  <Wrapper size={size} borderWeight={borderWeight}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Wrapper>
);

LoadingCircle.propTypes = {
  size: PropTypes.number,
  borderWeight: PropTypes.number,
};

export default LoadingCircle;
