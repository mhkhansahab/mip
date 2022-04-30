import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MultiBtn from "../components/common/Button/MultiBtn";

export default {
  title: "Example/Button",
  component: MultiBtn,
} as ComponentMeta<typeof MultiBtn>;

const Template: ComponentStory<typeof MultiBtn> = args => (
  <MultiBtn {...args} />
);

export const MultiBtnDef = Template.bind({});
MultiBtnDef.args = {
  children: "X3",
};

export const MultiActiveBtn = Template.bind({});
MultiActiveBtn.args = {
  children: "X1",
  active: true,
};
