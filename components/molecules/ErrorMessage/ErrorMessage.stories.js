import ErrorMessage from "./ErrorMessage";

export default {
  title: "Components/Molecules/ErrorMessage",
  component: ErrorMessage,
};

const Template = () => <ErrorMessage message="Login failed!" />;

export const Default = Template.bind({});
