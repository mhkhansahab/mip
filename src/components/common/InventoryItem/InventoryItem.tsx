import styled from "styled-components";
import smallDiamond from "../../../assets/img/smallDiamond.svg";
import borderMarket from "../../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/ellipseMarket.svg";
import { TedButton } from "../Button/TedButton";
import { Tier } from "../Tier";
import { Dispatch, SetStateAction } from "react";

type LootItemPropsType = {
  sell: number;
  name: string;
  part: string;
  price: number;
  visible: number;
  imgSrc: string;
  active: boolean;
  id: number;
  isManipulateLoading: boolean;
  manipulate: (partId: number, type: "replace" | "remove") => void;
  tier: string;
  count: number;
  robotId: number;
  material: string;
  openSellingModal: Dispatch<
    SetStateAction<{ name: string; sell: number; id: number } | null>
  >;
  isDisable: number | null;
};
export const InventoryItem = (props: LootItemPropsType) => {
  return (
    <MarketBG>
      <MarketItemWrapper>
        <MarketItemText>
          <RobotMarket src={props.imgSrc} alt="" />
          <BgRobotMarket src={borderMarket} alt="" />
          <CircleIconStyled />
          <h3>{`${props.name.split(" ").slice(1, 3).join(" ")} (${
            props.count
          })`}</h3>
          <p>{props.part}</p>
          <CristalCount>
            <span> {props.price} </span>
            <img src={smallDiamond} alt="" />
          </CristalCount>
          <ButtonWrapper>
            <TedButton
              onclick={() => props.manipulate(props.id, props.active && !props.isDisable ? "remove" : "replace")}
              size="small"
              color="green"
              width="140"
              active={props.active && !props.isDisable}
            >
              {props.active && !props.isDisable ? `MIP${props.robotId}` : "Apply"}
            </TedButton>
            <TedButton
              onclick={() => props.openSellingModal({
                  name: props.name,
                  sell: props.sell,
                  id: props.id
                })
              }
              refresh={true}
              size="small"
              color="blue"
              width="40"
              active={true}
            >
              <Dollar>$</Dollar>
            </TedButton>
          </ButtonWrapper>
        </MarketItemText>
      </MarketItemWrapper>
      <Tier tier={props.tier} />
      <RarityTitle>{props.material}</RarityTitle>
    </MarketBG>
  );
};

const RarityTitle = styled.div`
  background: #c101c9;
  text-align: center;
  padding: 2px 11px;
  border-radius: 6px;
  border: none;
  color: #fff;
  position: absolute;
  top: 32%;
  z-index: 2;
`;

const Dollar = styled.div`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  color: #0a80d1;
  margin-left: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;

  button {
    margin-right: 8px;
  }
`;

const CircleIconStyled = styled(CircleIcon)`
  fill: #29efa8;
  position: absolute;
  width: 100%;
`;

const RobotMarket = styled.img`
  z-index: 1;
`;

const BgRobotMarket = styled.img`
  position: absolute;
`;

const MarketBG = styled.div`
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  height: 277px;
  width: 226px;
  border-radius: 12px;
  margin: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  @media (max-width: 1440px) {
    margin: 14px;
  }
  @media (max-width: 1366px) {
    margin: 8px;
  }

  @media (max-width: 1280px) {
    width: 210px;
  }

  @media (max-width: 490px) {
    width: 190px;
  }

  @media (max-width: 446px) {
    width: 100%;
  }
`;

const MarketItemWrapper = styled.div`
  height: 277px;
  width: 226px;
  cursor: context-menu;
  background: linear-gradient(45deg, #1f2933 3%, #151b24 3%);
  border-radius: 12px;

  @media (max-width: 446px) {
    width: 100%;
    background: none;
  }
`;

const MarketItemText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
    margin-top: 8px;
  }

  > h3 {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }

  > img {
    height: 98px;
    margin: 14px 0 13px 0;
  }

  button {
    margin-top: 23px;
  }
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffd63d;
  }

  > img {
    margin-left: 6px;
  }
`;
