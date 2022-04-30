import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./reset.css";
import { Achieve } from "../components/common/Achieve";

export default {
  title: "Example/Achieve in Loot",
  component: Achieve,
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof Achieve>;

const Template: ComponentStory<typeof Achieve> = args => (
  <div style={{ width: 275 }}>
    <Achieve {...args} />
  </div>
);

export const Diamond = Template.bind({});
Diamond.args = {
  achieveType: "diamond",
  count: 9999,
  descr: "But because these",
};

export const Box = Template.bind({});
Box.args = {
  achieveType: "box",
  count: 42,
  descr: "But because these",
};

export const Star = Template.bind({});
Star.args = {
  achieveType: "star",
  count: 80,
  descr: "But because these",
};
