import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./Input.styles";

const Input = forwardRef(({ name, inputType }, ref) => (
  <Wrapper>
    <input ref={ref} type={inputType} required />
    <label>{name}</label>
  </Wrapper>
));
Input.displayName = "Input";

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
};

export default Input;
