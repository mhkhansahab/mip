import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MenuRobotProgress } from "../components/common/MenuRobotProgress";
import "./reset.css";

export default {
  title: "Example/Robot in Menu",
  component: MenuRobotProgress,
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof MenuRobotProgress>;

const Template: ComponentStory<typeof MenuRobotProgress> = args => (
  <MenuRobotProgress {...args} />
);

export const FullRobot = Template.bind({});
FullRobot.args = {
  currentExp: 90,
  needExp: 100,
  level: "2",
};

export const UnactiveRobot = Template.bind({});
UnactiveRobot.args = {
  currentExp: 90,
  needExp: 100,
  level: "2",
  unActive: true,
};
