import PropTypes from "prop-types";
import { Wrapper } from "./Input.styles";

const Input = ({ name, inputType }) => (
  <Wrapper>
    <input type={inputType} required />
    <label>{name}</label>
  </Wrapper>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
};

export default Input;
