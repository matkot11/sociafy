import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./Input.styles";

const Input = forwardRef(({ name, inputType, required = false }, ref) => (
  <Wrapper>
    <label>
      {name}
      <input ref={ref} type={inputType} required={required} />
    </label>
  </Wrapper>
));
Input.displayName = "Input";

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default Input;
