import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./reset.css";
import { LootItem } from "../components/common/LootItem";

export default {
  title: "Example/Loot Item",
  component: LootItem,
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof LootItem>;

const Template: ComponentStory<typeof LootItem> = args => (
  <div style={{ background: "black", height: 500 }}>
    <LootItem {...args} />
  </div>
);

export const LootItemExample = Template.bind({});
