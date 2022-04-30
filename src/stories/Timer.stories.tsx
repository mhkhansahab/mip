import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Timer } from "../components/common/TimerFreeOpen";

export default {
  title: "Example/TimerFreeOpen",
  component: Timer,
} as ComponentMeta<typeof Timer>;

const time = new Date();
time.setSeconds(time.getSeconds() + 10000);

const Template: ComponentStory<typeof Timer> = args => <Timer {...args} />;

export const Time = Template.bind({});
Time.args = {
  expiryTimestamp: time,
};
