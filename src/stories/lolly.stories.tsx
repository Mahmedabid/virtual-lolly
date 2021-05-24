import React from 'react';

export default {
  title: 'Lolly',
  component: Lolly,
};

const Template = (args) => <Lolly {...args} />;

export const Default = Template.bind({});
Default.argTypes = {LollyTop: {control: false}, LollyMiddle: {control: false}, LollyBottom: {control: false}}};
Default.args = {
    LollyTop: "#d323d3",
    LollyMiddle: "#5823d3",
    LollyBottom: "#2384d3" 
};

export const Custom = Template.bind({});
Custom.args = {
    LollyTop: "#d323d3",
    LollyMiddle: "#5823d3",
    LollyBottom: "#2384d3" 
};