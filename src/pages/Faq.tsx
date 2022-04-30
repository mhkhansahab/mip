import { useState } from "react";
import styled from "styled-components";
import spriteFaq from "../assets/img/spriteFaq.svg";
import { AccordionFaq } from "../components/AccordionFaq";
import { faqSectionData } from "../utils/commonTypes";

type FaqPropsType = {};

const faqTabs = [
  {
    text: "Account",
    value: "user",
    descr: "Lorem lorem lorem",
  },
  {
    text: "Wallet",
    value: "wallet",
    descr: "Lorem lorem lorem",
  },
  {
    text: "Shield",
    value: "shield",
    descr: "Lorem lorem lorem",
  },
  {
    text: "Arrow",
    value: "arrow",
    descr: "Lorem lorem lorem",
  },
  {
    text: "Clock",
    value: "clock",
    descr: "Lorem lorem lorem",
  },
  {
    text: "Game",
    value: "game",
    descr: "Lorem lorem lorem",
  },
];

export const Faq = (props: FaqPropsType) => {
  const [activeTab, setActiveTab] = useState<string>(faqTabs[0].value);
  const [activeSection, setActiveSetcion] = useState<number | null>(null);

  const handleClick = (newTab: string) => {
    setActiveTab(newTab);
    setActiveSetcion(null);
  };

  const activeTabSection = faqSectionData.filter(
    item => item.value === activeTab,
  );

  const sectionMap = activeTabSection[0].tabs;

  return (
    <FaqContainer>
      <LeftMenu>
        <FaqTabs>
          {faqTabs.map(tab => (
            <FaqTab
              key={tab.value}
              onClick={() => handleClick(tab.value)}
              active={activeTab === tab.value}
            >
              <Icon active={activeTab === tab.value}>
                <use xlinkHref={`${spriteFaq}#${tab.value}`}></use>
              </Icon>
              <div>
                <span>{tab.text}</span>
                <br />
                <p>{tab.descr}</p>
              </div>
            </FaqTab>
          ))}
        </FaqTabs>
      </LeftMenu>
      <RightText>
        <Accordion>
          {sectionMap.map(item => (
            <AccordionFaq
              key={item.title}
              id={item.id}
              title={item.title}
              content={item.content}
              activeSection={activeSection}
              setActiveSetcion={setActiveSetcion}
            />
          ))}
        </Accordion>
      </RightText>
    </FaqContainer>
  );
};

const Accordion = styled.div``;

const Icon = styled.svg<{
  active: boolean;
}>`
  margin: 0 14px 0px 20px;
  height: 21px;
  width: 21px;

  fill: ${({ active }) => (active ? `#29EFA8` : `#DADADA`)};
`;

const FaqTab = styled.div<{ active: boolean }>`
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  border-radius: 6px;
  background: #1c252e;
  height: 80px;
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  ${props => (props.active ? `background: #1c252e;` : `background: none;`)}

  > div {
    > p {
      margin-top: 4px;
      color: ${props => (props.active ? `#ffffff;` : `#616D7A;`)};
    }
  }
  > img {
    margin: 0 14px 0 20px;
    height: 21px;
    fill: #29efa8;
  }
`;

const FaqTabs = styled.div``;

const LeftMenu = styled.div`
  width: 440px;
  height: 790px;
  background: #0e141a;
  padding: 20px 20px 0 20px;
`;

const RightText = styled.div`
  padding: 37px 48px 0 48px;
  width: 100%;
  @media (max-width: 1440px) {
    width: 740px;
  }
`;

const FaqContainer = styled.div`
  color: #fff;
  display: flex;
`;
