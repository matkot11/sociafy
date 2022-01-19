import PropTypes from "prop-types";
import Navbar from "../../organisms/Navbar/Navbar";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  padding: 2rem 0 8rem 0;
  width: 100%;
  overflow-y: scroll;
  justify-self: center;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: 2rem;
  }
`;

const MainTemplate = ({ children, userId }) => (
  <Wrapper>
    <Navbar userId={userId} />
    <InnerWrapper>{children}</InnerWrapper>
  </Wrapper>
);

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MainTemplate;
