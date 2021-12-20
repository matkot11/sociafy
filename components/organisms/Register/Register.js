import PropTypes from "prop-types";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";

const Register = ({ onClickRegister, onClickLogin }) => (
  <Form>
    <Input inputType="email" name="Email" isRequired={true} />
    <Input inputType="password" name="Password" isRequired={true} />
    <Input inputType="password" name="Repeat Password" isRequired={true} />
    <RectangleButton onClick={onClickRegister}>Register</RectangleButton>
    <RectangleButton onClick={onClickLogin}>Login</RectangleButton>
  </Form>
);

Register.propTypes = {
  onClickLogin: PropTypes.func,
  onClickRegister: PropTypes.func,
};

export default Register;
