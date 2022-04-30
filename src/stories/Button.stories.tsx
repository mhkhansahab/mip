import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TedButton } from "../components/common/Button/TedButton/TedButton";

export default {
  title: "Example/Button",
  component: TedButton,
} as ComponentMeta<typeof TedButton>;

const Template: ComponentStory<typeof TedButton> = args => (
  <TedButton {...args} />
);

export const TedMainBtn = Template.bind({});
TedMainBtn.args = {
  color: "yellow",
  size: "big",
  children: "TWIST NOW",
  width: "250",
};

export const TedAcceptBtn = Template.bind({});
TedAcceptBtn.args = {
  color: "green",
  children: "Accept",
  size: "medium",
  width: "140",
};

export const TedSellBtn = Template.bind({});
TedSellBtn.args = {
  active: true,
  children: "$",
  color: "blue",
  size: "small",
  width: "40",
};
