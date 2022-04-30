import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LeaderPosition } from "../components/TopLeaders/LeaderPosition";

export default {
  title: "Example/TopPosition",
  component: LeaderPosition,
} as ComponentMeta<typeof LeaderPosition>;

const Template: ComponentStory<typeof LeaderPosition> = args => (
  <LeaderPosition {...args} />
);

export const FirstPos = Template.bind({});
FirstPos.args = {
  data: {
    earn: 10000,
    id: 1,
    place: 1,
    userName: "VladiK Kolovratik",
  },
};

export const SecondPos = Template.bind({});
SecondPos.args = {
  data: {
    earn: 6666,
    id: 2,
    place: 2,
    userName: "VladiK Konopatik",
  },
};

export const ThirdPosition = Template.bind({});
ThirdPosition.args = {
  data: {
    earn: 666,
    id: 3,
    place: 3,
    userName: "VladiK Cover",
  },
};
