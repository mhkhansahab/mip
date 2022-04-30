import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BonusesVerticalItem } from "../components/common/BonusesVerticalItem/BonusesVerticalItem";

export default {
  title: "Example/BonusesItem",
  component: BonusesVerticalItem,
} as ComponentMeta<typeof BonusesVerticalItem>;

const Template: ComponentStory<typeof BonusesVerticalItem> = args => (
  <BonusesVerticalItem {...args} />
);

export const StoryOpenCase = Template.bind({});
StoryOpenCase.args = {
  addCoin: 66,
  caseCoin: 6666,
  caseName: "Case Name",
  robotDescr: "Head",
  robotName: "Robot Name",
};
