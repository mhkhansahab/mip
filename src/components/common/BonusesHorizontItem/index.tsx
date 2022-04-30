import styled from "styled-components";
import smallDiamond from "../../../assets/img/smallDiamond.svg";
import arrowTop from "../../../assets/img/bonusesArrowTop.svg";
import arrowBot from "../../../assets/img/bonusesArrowBot.svg";
import borderBonuses from "../../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/ellipseMarket.svg";
import { imageRoute } from "../../../utils/api";

type LootItemPropsType = {
  status: "sell" | "buy" | string;
  name: string;
  descr: string;
  coin: number;
  src: string;
};

const BonusesHorizontItem = (props: LootItemPropsType) => {
  return (
    <MarketBG>
      <MarketItemWrapper>
        <MarketItemText>
          <RobotBonuses src={`${imageRoute}${props.src}`} alt="" />
          <BgRobotMarket src={borderBonuses} alt="" />
          <CircleIconStyled />
          <h3>{props.name}</h3>
          <p>{props.descr}</p>
          <CristalCount status={props.status}>
            <span>{props.coin} MIP</span>
            <img src={smallDiamond} alt="" />
          </CristalCount>
          <Arrow status={props.status}>
            {props.status === "sell" && <img src={arrowTop} alt="" />}
            {props.status === "buy" && <img src={arrowBot} alt="" />}
          </Arrow>
        </MarketItemText>
      </MarketItemWrapper>
    </MarketBG>
  );
};

export default BonusesHorizontItem;

const CircleIconStyled = styled(CircleIcon)`
  fill: #29efa8;
  position: absolute;
`;

const RobotBonuses = styled.img`
  z-index: 1;
`;

const BgRobotMarket = styled.img`
  position: absolute;
`;

const MarketBG = styled.div`
  background: #0b1014;
  width: 153px;
  height: 174px;
  border-radius: 12px;
  margin-top: 10px;
  position: relative;
`;

const MarketItemWrapper = styled.div`
  cursor: context-menu;
  background: #0b1014;
  border-radius: 12px;
`;

const MarketItemText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
    margin: 4px 0 10px 0;
  }

  > h3 {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }

  > img {
    height: 98px;
    margin: 14px 0 9px 0;
  }

  button {
    margin-top: 24px;
  }
`;

const Arrow = styled.div<{
  status: string;
}>`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -9px;
  right: -9px;

  background: ${props =>
    props.status === "sell"
      ? `#29EFA8;`
      : props.status === "buy"
      ? `#D7374A;`
      : ""};

  > img {
    margin-right: 2px;
  }
`;

const CristalCount = styled.div<{
  status: string;
}>`
  display: flex;
  align-items: center;
  margin-left: 7px;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    margin-bottom: 6px;

    ${props =>
      props.status === "sell"
        ? `color: #29efa8;`
        : props.status === "buy"
        ? `color: #D7374A;`
        : ""}
  }

  > img {
    margin-bottom: 6px;
    margin-left: 6px;
  }
`;
