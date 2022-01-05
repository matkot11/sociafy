import PropTypes from "prop-types";
import Navbar from "../../organisms/Navbar/Navbar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  margin-top: 2rem;
  width: 80%;
  justify-self: center;
  transition: all 0.5s;
`;

const MainTemplate = ({ children }) => (
  <Wrapper>
    <Navbar />
    <InnerWrapper>{children}</InnerWrapper>
  </Wrapper>
);

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
