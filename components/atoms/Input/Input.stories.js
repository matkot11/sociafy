import Input from "./Input";

export default {
  title: "Components/Atoms/Input",
  component: Input,
};
const Template = () => (
  <Input inputType="email" name="email" isRequired={true} />
);
export const Default = Template.bind({});
