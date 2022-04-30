import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Bonus } from "../components/common/Bonus/Bonus";

export default {
  title: "Example/BonusesItem",
  component: Bonus,
} as ComponentMeta<typeof Bonus>;

const Template: ComponentStory<typeof Bonus> = args => <Bonus {...args} />;

export const BonusItem = Template.bind({});
BonusItem.args = {
  currentProg: 2,
  descrBonus: "descr bon",
  nameBonus: "Name bonus",
  needProg: 3,
  rewardCoin: 20,
};
