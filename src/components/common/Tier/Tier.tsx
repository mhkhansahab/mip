import styled from "styled-components";
import rightIcon from "../../../assets/img/rightIconItems.png";

type PropsTierType = {
  tier: string;
};

export function Tier(props: PropsTierType) {
  return (
    <TierWrapper>
      <LeftTier tier={props.tier}>
        T
        {props.tier === "Fanatic"
          ? "1"
          : props.tier === "Adept"
          ? "2"
          : props.tier === "Initiate"
          ? "3"
          : "n"}
      </LeftTier>
      <RightIcon>
        <img src={rightIcon} alt="" />
      </RightIcon>
    </TierWrapper>
  );
}

const LeftTier = styled.div<{
  tier: string;
}>`
  width: 28px;
  height: 24px;
  margin: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 6px;
  border: none;

  font-size: 13px;
  line-height: 16px;
  letter-spacing: 2px;
  padding: 2px 0 0 2px;

  ${props =>
    props.tier === "Fanatic"
      ? `color: #BE5B00;
      background: linear-gradient(-45deg ,transparent 5px,#FDA12A 0) 
      right,linear-gradient(135deg ,transparent 5px,#FDA12A 0) left;
      background-size: 51% 100%;
      background-repeat: no-repeat;
      text-shadow: #FFCF68 1px 0px, #FFCF68 0px 1px, #FFCF68 -1px 0px, #FFCF68 0px -1px, #FFCF68 1px 1px, #FFCF68 -1px 1px, #FFCF68 -1px -1px, #FFCF68 1px -1px;`
      : props.tier === "Adept"
      ? `color: #4D4D4D;
      background: linear-gradient(-45deg ,transparent 5px,#B8B8B8 0) 
      right,linear-gradient(135deg ,transparent 5px,#B8B8B8 0) left;
      background-size: 51% 100%;
      background-repeat: no-repeat;
      text-shadow: white 1px 0px, white 0px 1px, white -1px 0px, white 0px -1px, white 1px 1px, white -1px 1px, white -1px -1px, white 1px -1px;`
      : props.tier === "Initiate"
      ? `color: #602207;
      background: linear-gradient(-45deg ,transparent 5px,#B85D34 0) 
      right,linear-gradient(135deg ,transparent 5px,#B85D34 0) left;
      background-size: 51% 100%;
      background-repeat: no-repeat;
      text-shadow: #FF9569 1px 0px, #FF9569 0px 1px, #FF9569 -1px 0px, #FF9569 0px -1px, #FF9569 1px 1px, #FF9569 -1px 1px, #FF9569 -1px -1px, #FF9569 1px -1px;`
      : `color: #fff;
      background: linear-gradient(-45deg ,transparent 5px,#000 0) 
      right,linear-gradient(135deg ,transparent 5px,#000 0) left;
      background-size: 50% 100%;
      background-repeat: no-repeat;
      text-shadow: #gray 1px 0px, #gray 0px 1px, #gray -1px 0px, #gray 0px -1px, #gray 1px 1px, #gray -1px 1px, #gray -1px -1px, #gray 1px -1px;`};
`;
const RightIcon = styled.div`
  margin: 12px;
`;

const TierWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
`;
