import PropTypes from "prop-types";
import Form from "../../molecules/Form/Form";
import Input from "../../atoms/Input/Input";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";

const Login = ({ onClickLogin, onClickRegister }) => (
  <Form>
    <Input inputType="email" name="Email" isRequired={true} />
    <Input inputType="password" name="Password" isRequired={true} />
    <RectangleButton onClick={onClickLogin}>Login</RectangleButton>
    <RectangleButton onClick={onClickRegister}>Register</RectangleButton>
  </Form>
);

Login.propTypes = {
  onClickLogin: PropTypes.func,
  onClickRegister: PropTypes.func,
};

export default Login;
