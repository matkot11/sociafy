import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.darkGrey};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const GreyWrapper = ({ children, as = "div" }) => (
  <Wrapper as={as}>{children}</Wrapper>
);

GreyWrapper.prototype = {
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
};

export default GreyWrapper;
