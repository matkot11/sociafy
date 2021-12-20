import Form from "./Form";
import Input from "../../atoms/Input/Input";
import RectangleButton from "../../atoms/RectangleButton/RectangleButton";

export default {
  title: "Components/Molecules/Form",
  component: Form,
};

const Template = () => (
  <Form>
    <Input inputType="text" name="Name" isRequired={true} />
    <Input inputType="email" name="Email" isRequired={true} />
    <RectangleButton>Login</RectangleButton>
  </Form>
);

export const Default = Template.bind({});
