import React from "react";
import Button from "../components/Button/Button";

export default {
    title: 'Button',
    component: Button,
  };
  
  const Template = (args) => <Button {...args} />;
  
  export const Primary = Template.bind({});
  Primary.argTypes = {type: {control: false}};
  Primary.args = {
    type: "button",
    value: 'Button',
  };
  
  export const Submit = Template.bind({});
  Submit.argTypes = {type: {control: false}};
  Submit.args = {
    type: "submit",
    value: 'Submit',
  };

  export const Reset = Template.bind({});
  Reset.argTypes = {type: {control: false}};
  Reset.args = {
    type: "reset",
    value: 'Reset',
  };

  export const Custom = Template.bind({});
  Custom.args = {
    type: "button",
    value: 'custom',
  };