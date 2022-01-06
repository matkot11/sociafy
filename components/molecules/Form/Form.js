import PropTypes from "prop-types";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 1.5rem;
  }
`;

const Form = ({ children, onSubmit }) => (
  <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
};

export default Form;
