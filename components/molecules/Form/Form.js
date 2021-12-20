import PropTypes from "prop-types";
import styled from "styled-components";

const StyledForm = styled.form`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 1.5rem;
  }
`;

const Form = ({ children }) => <StyledForm>{children}</StyledForm>;

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;