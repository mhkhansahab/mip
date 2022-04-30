import { NavLink } from "react-router-dom";
import styled from "styled-components";
import smallDiamond from "../../../assets/img/smallDiamond.svg";
import { imageRoute } from "../../../utils/api";
import { EpickBtn } from "../Button/EpickBtn";

type LootItemPropsType = {
  id: number;
  rarity: string;
  name: string;
  price: number;
  src: string;
  type: string;
  disabled: boolean;
};

export const LootItem = (props: LootItemPropsType) => {
  const colorRarity = props.rarity.toLocaleLowerCase();

  return (
    <LootItemWrapper
      color={props.type === "free" ? "free" : colorRarity}
      dis={props.disabled}
    >
      <NavLink to={props.disabled ? `/loot/${props.id}` : `#`}>
        <LootItemBg>
          <EpickBtn
            onclick={() => {}}
            color={props.type === "free" ? "free" : colorRarity}
          >
            {props.type === "free" ? "FREE" : "RARITY"}
          </EpickBtn>
        </LootItemBg>
        <LootItemText>
          <h3>{props.name}</h3>
          {props.src.length === 0 ? (
            <div>No Photo</div>
          ) : (
            <img src={`${imageRoute}${props.src}`} alt="" />
          )}
          <CristalCount>
            <span>{props.price} </span>
            <img src={smallDiamond} alt="" />
          </CristalCount>
        </LootItemText>
      </NavLink>
    </LootItemWrapper>
  );
};

const LootItemWrapper = styled.div<{
  color: string;
  dis: boolean;
}>`
  height: 375px;
  width: 310px;
  position: relative;

  :hover {
    ${props => (props.dis ? `cursor: pointer;` : `cursor: no-drop;`)}
  }

  :hover img {
    ${props =>
      props.dis
        ? `cursor: pointer;transform: scale(1.05);
    transition: 0.2s transform;`
        : `cursor: no-drop;`}
  }

  img {
    transition: 0.2s transform;
  }

  ${props => (props.dis ? `opacity: 1;` : `opacity: 0.5;`)}
`;

const LootItemBg = styled.div`
  width: 310px;
  height: 310px;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: flex-end;

  > button {
    margin-bottom: 40px;
    z-index: 1;
  }
`;

const LootItemText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #ffffff;
  }

  > img {
    margin-top: 6px;
    position: absolute;
    top: 0;
  }
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  > span {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #ffd63d;
  }

  > img {
    margin-left: 6px;
  }
`;
