import styled from "styled-components";
import { TopLeaders } from "../components/TopLeaders/TopLeaders";
import { TopTable } from "../components/TopTable";
import topHeaderBg from "../assets/img/topBackground.png";
import { useState } from "react";

type TopPropsType = {};

const topTabs = [
  {
    text: "All time",
    value: "All time",
  },
  {
    text: "In day",
    value: "In day",
  },
  {
    text: "In week",
    value: "In week",
  },
  {
    text: "In month",
    value: "In month",
  },
];

const Top = (props: TopPropsType) => {
  const [activeTab, setActiveTab] = useState<string>("All time");

  const handleClick = (newTab: string) => {
    setActiveTab(newTab);
  };

  return (
    <TopContainer>
      <TopHeader>
        <HeaderText>
          <h3>TOP players</h3>
          <p>
            But because those who do not know how to pursue pleasure rationally
            encounter consequences that
          </p>
        </HeaderText>
        <TopTabs>
          {topTabs.map(tab => (
            <TopTab
              key={tab.value}
              onClick={() => handleClick(tab.value)}
              active={activeTab === tab.value}
            >
              {tab.text}
            </TopTab>
          ))}
        </TopTabs>
      </TopHeader>
      <TopLeaders />
      <TopTableContainer>
        <TopTable />
      </TopTableContainer>
    </TopContainer>
  );
};

export default Top;

const TopContainer = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopHeader = styled.div`
  height: 251px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(${topHeaderBg});
  background-color: rgba(19, 26, 34, 0.5);
`;

const HeaderText = styled.div`
  max-width: 378px;
  margin-top: 53px;
  text-align: center;

  h3 {
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
    color: #ffffff;
  }

  p {
    margin-top: 8px;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #616d7a;
  }
`;

const TopTabs = styled.div`
  display: flex;
  margin-top: auto;
`;

const TopTab = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  z-index: 1;
  opacity: ${props => (props.active ? 1 : 0.5)};

  ${props =>
    props.active &&
    `background: #0A0B0D;
  border-radius: 12px 12px 0px 0px;`}

  :hover {
    cursor: pointer;
  }

  > span {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffffff;
  }
`;

const TopTableContainer = styled.div`
  margin-top: 62px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
