import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.darkGrey};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  @media only screen and (min-width: ${({ theme }) => theme.size.xs}) {
    border-radius: 5px;
  }
`;

const GreyWrapper = ({ onClick, children, as = "div" }) => (
  <Wrapper onClick={onClick} as={as}>
    {children}
  </Wrapper>
);

GreyWrapper.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
};

export default GreyWrapper;
