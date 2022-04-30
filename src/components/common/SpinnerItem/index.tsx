import styled from "styled-components";
import borderMarket from "../../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/ellipseMarket.svg";
import { Tier } from "../Tier";
///
type LootItemPropsType = {
  name: string;
  type: string;
  src: string;
  typeDetails: string;
  imgSrc: string;
  tier: string;
};

const SpinnerItem = (props: LootItemPropsType) => {
  const nameDetail = props.name.split("_").slice(-2).join(" ");

  return (
    <SpinItemBG>
      <SpinItemWrapper>
        <SpinItemText>
          <ItemSpin src={props.imgSrc} alt="" />
          <BgItemSpin src={borderMarket} alt="" />
          <CircleIconStyled />
          <h3>{nameDetail}</h3>
          <p>{props.type}</p>
        </SpinItemText>
      </SpinItemWrapper>
      <Tier tier={props.tier} />
      <TypeDetails type={props.typeDetails}>{props.typeDetails}</TypeDetails>
    </SpinItemBG>
  );
};

export default SpinnerItem;

const TypeDetails = styled.div<{
  type: string;
}>`
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  padding-top: 3px;
  color: #fff;
  width: 66px;
  height: 19px;
  border-radius: 6px;
  top: 50%;
  left: calc(50% - 33px);
  position: absolute;
  z-index: 10;

  background: ${props =>
    props.type === "Haruto"
      ? `#C101C9;`
      : props.type === "Malaya"
      ? `#7725CB;`
      : props.type === "Einar"
      ? `#DB2323;`
      : props.type === "Coda"
      ? `#177E34;`
      : props.type === "Chiara"
      ? `#2A46FE;`
      : `#2A46FE;`};
`;

const CircleIconStyled = styled(CircleIcon)`
  fill: #29efa8;
  position: absolute;
`;

const ItemSpin = styled.img`
  z-index: 1;
  height: 75px;
  margin: 26px 0 38px 0;
`;

const BgItemSpin = styled.img`
  position: absolute;
  height: 98px;
  margin: 14px 0 9px 0;
`;

const SpinItemBG = styled.div`
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  height: 198px;
  width: 226px;
  border-radius: 12px;
  margin: 12px;
  position: relative;
`;

const SpinItemWrapper = styled.div`
  height: 198px;
  width: 226px;
  cursor: context-menu;
  background: linear-gradient(45deg, #1f2933 3%, #151b24 3%);
  border-radius: 12px;
`;

const SpinItemText = styled.div`
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

  button {
    margin-top: 24px;
  }
`;
