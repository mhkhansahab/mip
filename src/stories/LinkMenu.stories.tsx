import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./reset.css";
import { LinkMenu } from "../components/common/LinkMenu";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Example/Link in Left Menu",
  component: LinkMenu,
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof LinkMenu>;

const Template: ComponentStory<typeof LinkMenu> = args => (
  <Router>
    <LinkMenu {...args} />
  </Router>
);

export const ActiveGarage = Template.bind({});
ActiveGarage.args = {
  active: true,
  title: "garage",
  path: "",
};

export const UnactiveLoot = Template.bind({});
UnactiveLoot.args = {
  active: true,
  title: "loot",
  path: "",
};
