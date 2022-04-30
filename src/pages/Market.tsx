import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import loadable from '@loadable/component';
import { useParams } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/img/search.svg";
import { ReactComponent as RectangleIcon } from "../assets/img/tabRectangle.svg";
import lootHeaderBg from "../assets/img/backgroundMarket.png";
import { useGetParamsForDetailsFilter } from "../hooks/useGetParamsForDetailsFilter";
import { useAdminGetAllSpareParts } from "../hooks/useAdminGetAllSpareParts";
import {
  checkImageSrc,
  checkSingleParamInSparePart,
  checkTier,
  customStylesForGarageSelect,
} from "../utils/commonFunctions";
import { imageRoute } from "../utils/api";

const Achieve = loadable(() => import('../components/common/Achieve'));
const MarketItem = loadable(() => import('../components/common/MarketItem'));
const Switcher = loadable(() => import('../components/common/Switcher'));
const CustomLoader = loadable(() => import('../components/common/Loader'));
const Pagination = loadable(() => import('../components/common/Pagination'));

type MarketPropsType = {
  balance: number;
  countCase: number;
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
    text: "All",
    value: "",
    img: false,
    color: "none",
  },
  {
    text: "Common",
    value: "Gray",
    img: true,
    color: "#6A6A6A",
  },
  {
    text: "Uncommon",
    value: "Green",
    img: true,
    color: "#29EFA8",
  },
  {
    text: "Rare",
    value: "Blue",
    img: true,
    color: "#319CFF",
  },
  {
    text: "Epic",
    value: "Purple",
    img: true,
    color: "#6829EF",
  },
  {
    text: "Legendary",
    value: "Yellow",
    img: true,
    color: "#FFAD0F",
  },
  {
    text: "Immortal",
    value: "Red",
    img: true,
    color: "#FF3030",
  },
];

const Market = (props: MarketPropsType) => {
  const params = useParams<{ marketPageNumber: string }>();

  const [activeTab, setActiveTab] = useState<string>("All");
  const [switchers, setSwitchers] = useState<boolean>(false);

  const { data: filterParams } = useGetParamsForDetailsFilter();

  const [partSelectValue, setPartSelectValue] = useState<string>("");
  const [factionSelectValue, setFactionSelectValue] = useState<string>("");
  const [searchStr, setSearchStr] = useState<string>("");

  const checkFilterParams = (str: "faction" | "part") => {
    const emptyFilter = {
      value: "",
      label: `No ${str} filter`,
    };
    const filterParamsArr = filterParams?.data[str].map(item => {
      return {
        value: item,
        label: item,
      };
    });
    return filterParamsArr ? [emptyFilter, ...filterParamsArr] : [emptyFilter];
  };

  const [rarDetails, setRarDetails] = useState<string>("");

  const { data: spareParts, isLoading: isGetSparePartsLoading } =
    useAdminGetAllSpareParts({
      page: Number(params.marketPageNumber),
      filter: {
        part: partSelectValue,
        name: searchStr,
        faction: factionSelectValue,
        rarity: rarDetails,
      },
      isMarket: 1,
    });

  const handleClick = (newTab: string, rar: string) => {
    setActiveTab(newTab);
    setRarDetails(rar);
  };

  return (
    <MarketContainer>
      <MarketHeader>
        <MarketTextAndAchieve>
          <MarketText>
            <h4>Market</h4>
            <p>
              But because those who do not know how to pursue pleasure
              rationally encounter consequences that
            </p>
          </MarketText>
          <MarketAchieves>
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
          </MarketAchieves>
        </MarketTextAndAchieve>
        <MarketTabsAndSort>
          <MarketTabs>
            {rarityTabs.map(tab => (
              <MarketTab
                key={tab.value}
                onClick={() => handleClick(tab.value, tab.value)}
                active={activeTab === tab.value}
                color={tab.color}
              >
                {tab.img && <RectangleIcon />}
                <span>{tab.text}</span>
              </MarketTab>
            ))}
          </MarketTabs>
        </MarketTabsAndSort>
      </MarketHeader>

      <MarketWrapper>
        <MaketTools>
          <MarketFilter>
            <SearchInputWrapper>
              <SearchIcon />
              <SearchInput
                value={searchStr}
                onChange={e => setSearchStr(e.currentTarget.value)}
                placeholder="Enter your request"
              />
            </SearchInputWrapper>
          </MarketFilter>
          <MarketSelect>
            <SwitcherWrapper>
              <Switcher
                active={switchers}
                setActive={() => setSwitchers(!switchers)}
              />
            </SwitcherWrapper>
            <SelectWrapper>
              <Select
                onChange={(e: any) => setFactionSelectValue(e?.value || "")}
                options={checkFilterParams("faction")}
                styles={customStylesForGarageSelect}
                placeholder="Chose Faction..."
              />
            </SelectWrapper>
            <SelectWrapper>
              <Select
                onChange={(e: any) => setPartSelectValue(e?.value || "")}
                options={checkFilterParams("part")}
                styles={customStylesForGarageSelect}
                placeholder="Chose Part..."
              />
            </SelectWrapper>
          </MarketSelect>
        </MaketTools>
        <MarketItems>
          {isGetSparePartsLoading ? (
            <CustomLoader margin="20px 0 0 30px;" />
          ) : !spareParts?.data.result.length ? (
            <NoItemTitle>You have no items in inventory now!</NoItemTitle>
          ) : (
            spareParts?.data.result.map(invItem => (
              <MarketItem
                key={invItem.id}
                idDetail={invItem.id}
                name={invItem.name}
                part={checkSingleParamInSparePart("part", invItem.partparams)}
                price={invItem.price || 0}
                imgSrc={`${imageRoute}${checkImageSrc(
                  invItem.images,
                  "Thumbnail_Layer",
                )}`}
                tier={checkTier(invItem.partparams)}
                disabled={invItem.price ? props.balance < invItem.price : false}
                count={invItem.space.in_market}
              />
            ))
          )}
        </MarketItems>
        {spareParts?.data &&
        spareParts?.data.result.filter(itm => itm.isOnMarket === 1).length >
          21 ? (
          <PaginationWrapper>
            <Pagination
              pageNumber={params.marketPageNumber}
              itemsPerPage={21}
              itemsCount={
                spareParts?.data.result.filter(i => i.isOnMarket === 1)
                  .length || 0
              }
            />
          </PaginationWrapper>
        ) : (
          ""
        )}
      </MarketWrapper>
    </MarketContainer>
  );
};

export default Market;

const NoItemTitle = styled.div``;

const MarketWrapper = styled.div`
  margin-top: 27px;
  width: 100%;
  background: #0a0b0d;
`;

const MarketTabsAndSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
`;

const MarketTabs = styled.div`
  display: flex;
`;

const MarketTab = styled.div<{ active: boolean; color?: string }>`
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
    margin-right: 6px;
    fill: ${props => props.color || ""};
  }

  > span {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffffff;
  }
  @media (max-width: 1440px) {
    width: 170px;
  }
  @media (max-width: 1440px) {
    width: 155px;
  }
`;

const MarketItems = styled.div`
  margin: 20px 0 0 30px;
  display: flex;
  flex-wrap: wrap;
`;

const MarketSelect = styled.div`
  margin-right: 48px;
  display: flex;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  width: 361px;
  height: 46px;
  background: #161d24;
  border-radius: 6px;
  font-size: 14px;
  line-height: 17px;
  border: none;
  margin-left: 32px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 12px;
`;

const SearchInput = styled.input`
  margin-left: 12px;
  background: none;
  outline: none;
  border: none;
  color: #fff;

  ::placeholder {
    color: #616d7a;
  }
`;

const MarketFilter = styled.div`
  display: flex;
  margin-left: 12px;
`;

const MaketTools = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MarketContainer = styled.div`
  color: #fff;
`;

const MarketHeader = styled.div`
  height: 251px;
  box-sizing: border-box;
  padding: 36px 48px 0 48px;
  background-image: url(${lootHeaderBg});
`;

const MarketTextAndAchieve = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MarketText = styled.div`
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

const MarketAchieves = styled.div`
  display: flex;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: 192px;
  height: 46px;
  margin-left: 12px;
`;

const PaginationWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwitcherWrapper = styled.div`
  display: none;
`;
