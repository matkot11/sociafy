import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./Input.styles";

const Input = forwardRef(
  ({ name = "", inputType, required = false, placeholder }, ref) => (
    <Wrapper>
      <label>
        {name}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          required={required}
        />
      </label>
    </Wrapper>
  ),
);
Input.displayName = "Input";

Input.propTypes = {
  name: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Input;
