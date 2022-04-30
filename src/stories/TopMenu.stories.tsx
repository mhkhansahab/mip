import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./reset.css";
import { TopMenu } from "../components/Menu";

export default {
  title: "Example/Top Menu",
  component: TopMenu,
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof TopMenu>;

const Template: ComponentStory<typeof TopMenu> = args => (
  <TopMenu countCase={3} usedFreeBox={false} />
);

export const TopMenuExample = Template.bind({});
TopMenuExample.args = {};
