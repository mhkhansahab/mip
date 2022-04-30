import styled from "styled-components";
import { LootItem } from "../components/common/LootItem";
import lootHeaderBg from "../assets/img/lootHeaderBg.png";
import { Achieve } from "../components/common/Achieve";
import { useState } from "react";
import { ReactComponent as DiamondIcon } from "../assets/img/smallDiamond.svg";
import { useAdminPostAllLootBoxes } from "../hooks/useAdminPostAllLootBoxes";
import { ProfileUserSpins } from "../utils/commonTypes";

type LootPropsType = {
  balance: number;
  countCase: number;
  freeBox: ProfileUserSpins[];
};

type AchieveType = {
  achieveType: "diamond" | "box" | "star";
  count: number;
  descr: string;
};

const achieves: AchieveType[] = [
  {
    achieveType: "diamond",
    count: 8899,
    descr: "But because there",
  },
  {
    achieveType: "box",
    count: 44,
    descr: "But because there",
  },
  {
    achieveType: "star",
    count: 80,
    descr: "But because there",
  },
];

const rarityTabs = [
  {
    text: "1-9 MIP",
    value: "1-9 MIP",
    minPrice: 1,
    maxPrice: 9,
    img: true,
  },
  {
    text: "20-39 MIP",
    value: "20-39 MIP",
    minPrice: 20,
    maxPrice: 39,
    img: true,
  },
  {
    text: "40-100 MIP",
    value: "40-100 MIP",
    minPrice: 40,
    maxPrice: 100,
    img: true,
  },
  {
    text: "Free Loot only",
    value: "Free Lot only",
    minPrice: 0,
    maxPrice: 0,
    types: ["free"],
    img: false,
  },
  {
    text: "Won from Season pass",
    value: "Won from Season pass",
    minPrice: 0,
    maxPrice: 0,
    types: ["A", "B", "C", "D"],
    img: false,
  },
];

const Loot = (props: LootPropsType) => {
  const [activeTab, setActiveTab] = useState<string>("1-9 MIP");
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(9);
  const [seasonType, setSeasonType] = useState<string[] | null>(null);

  const handleClick = (
    newTab: string,
    min?: number,
    max?: number,
    type?: string[],
  ) => {
    setActiveTab(newTab);
    min ? setMin(min) : setMin(0);
    max ? setMax(max) : setMax(0);
    type ? setSeasonType(type) : setSeasonType(null);
  };

  const { data: lootBoxesData } = useAdminPostAllLootBoxes({
    limit: 10,
    maxPrice: max,
    minPrice: min,
    page: 1,
    pageId: 1,
    types: seasonType,
  });

  const allLootBoxes = lootBoxesData?.data.rows || [];

  return (
    <LootContainer>
      <LootHeader>
        <LootTextAndAchieve>
          <LootText>
            <h4>Loot section</h4>
            <p>
              But because those who do not know how to pursue pleasure
              rationally encounter consequences that are extremely painful
            </p>
          </LootText>
          <LootAchieves>
            {achieves.map(achieve => (
              <Achieve
                key={achieve.count}
                achieveType={achieve.achieveType}
                count={achieve.count}
                descr={achieve.descr}
                balance={props.balance}
                countCase={props.countCase}
              />
            ))}
          </LootAchieves>
        </LootTextAndAchieve>
        <LootTabsAndSort>
          <LootTabs>
            {rarityTabs.map(tab => (
              <LootTab
                key={tab.value}
                onClick={() =>
                  handleClick(tab.value, tab.minPrice, tab.maxPrice, tab.types)
                }
                active={activeTab === tab.value}
              >
                <span>{tab.text}</span>
                {tab.img && <DiamondIcon />}
              </LootTab>
            ))}
          </LootTabs>
        </LootTabsAndSort>
      </LootHeader>
      <LootItemsContainer>
        {allLootBoxes.map(lootItem => (
          <LootItem
            key={lootItem.id}
            id={lootItem.id}
            name={lootItem.name}
            price={lootItem.price}
            rarity={lootItem.rarity}
            src={lootItem.images.length ? lootItem.images[0].key : ""}
            type={lootItem.type || ""}
            disabled={
              lootItem.price
                ? true
                : !!props.freeBox.filter(
                    item =>
                      item.lootbox.type === lootItem.type &&
                      item.lootbox.id === lootItem.id,
                  ).length
            }
          />
        ))}
        {!allLootBoxes.length && (
          <MessageNoItem>No such lootboxes found</MessageNoItem>
        )}
      </LootItemsContainer>
    </LootContainer>
  );
};

export default Loot;

const MessageNoItem = styled.div`
  width: 500px;
`;

const LootContainer = styled.div`
  color: #fff;
`;

const LootHeader = styled.div`
  height: 251px;
  box-sizing: border-box;
  padding: 36px 48px 0 48px;
  background-image: url(${lootHeaderBg});
  background-color: rgba(19, 26, 34, 0.5);
`;

const LootTabsAndSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
`;

const LootTabs = styled.div`
  display: flex;
`;

const LootTab = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px 0;
  width: 200px;
  opacity: ${props => (props.active ? 1 : 0.5)};

  ${props =>
    props.active &&
    `background: #0A0B0D;
  border-radius: 12px 12px 0px 0px;`}

  :hover {
    cursor: pointer;
  }
  > svg {
    margin-left: 6px;
  }

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffffff;
  }

  @media (max-width: 1280px) {
    width: 180px;
  }
`;

const LootItemsContainer = styled.div`
  padding: 24px 48px 44px 48px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 310px));
  grid-gap: 23px;
  min-height: 375px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 280px));
  }
  @media (max-width: 1366px) {
    grid-template-columns: repeat(auto-fill, minmax(270px, 270px));
  }
  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 250px));
  }
`;

const LootTextAndAchieve = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LootText = styled.div`
  max-width: 508px;

  h4 {
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
    color: #ffffff;
  }

  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #616d7a;
    margin-top: 8px;
  }
`;

const LootAchieves = styled.div`
  display: flex;
  align-items: center;
`;
