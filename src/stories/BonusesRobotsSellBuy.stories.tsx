import { ComponentStory, ComponentMeta } from "@storybook/react";
import BonusesHorizontItem from "../components/common/BonusesHorizontItem";

export default {
  title: "Example/BonusesItem",
  component: BonusesHorizontItem,
} as ComponentMeta<typeof BonusesHorizontItem>;

const Template: ComponentStory<typeof BonusesHorizontItem> = args => (
  <BonusesHorizontItem {...args} />
);

export const BuyRobot = Template.bind({});
BuyRobot.args = {
  coin: 21312,
  descr: "Head",
  name: "Epick Head",
  status: "buy",
};

export const SellRobot = Template.bind({});
SellRobot.args = {
  coin: 666,
  descr: "Body",
  name: "Epick Body",
  status: "sell",
};
