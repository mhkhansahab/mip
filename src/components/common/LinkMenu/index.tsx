import { NavLink } from "react-router-dom";
import styled from "styled-components";
import sprite from "../../../assets/img/sprite.svg";
import adminSprite from "../../../assets/img/adminMenuSprite.svg";

type LinkMenuPropsType = {
  title:
    | "garage"
    | "loot"
    | "market"
    | "seasonpass"
    | "top"
    | "faq"
    | "profile"
    | "progress";
  active: boolean;
  path: string;
};

type AdminLinkMenuPropsType = {
  title: "details" | "lootboxes" | "market";
  active: boolean;
  path: string;
};

export const LinkMenu = (props: LinkMenuPropsType) => {
  return (
    <NavLink to={props.path}>
      <LinkMenuWrapper title={props.title}>
        <Icon active={props.active} className={`icon-${props.title}`}>
          <use xlinkHref={`${sprite}#${props.title}`}></use>
        </Icon>
        <LinkMenuTitle active={props.active}>
          {props.title.toUpperCase()}
        </LinkMenuTitle>
      </LinkMenuWrapper>
    </NavLink>
  );
};

export const AdminLinkMenu = (props: AdminLinkMenuPropsType) => {
  return (
    <NavLink to={props.path}>
      <LinkMenuWrapper title={props.title}>
        <Icon active={props.active} className={`icon-${props.title}`}>
          <use xlinkHref={`${adminSprite}#${props.title}`}></use>
        </Icon>
        <LinkMenuTitle active={props.active}>
          {props.title.toUpperCase()}
        </LinkMenuTitle>
      </LinkMenuWrapper>
    </NavLink>
  );
};

const LinkMenuWrapper = styled.div<{ title: string }>`
  height: 50px;
  width: 59px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0b1014;

  svg:not(.icon-garage) {
    margin-right: 3px;
  }

  .icon-garage {
    margin-left: 5px;
  }

  :hover {
    cursor: pointer;
  }

  svg {
    width: 50px;
  }

  :hover svg {
    fill: #29efa8;
  }

  :hover p {
    color: #ffffff;
  }
`;

const Icon = styled.svg<{ active: boolean }>`
  fill: ${({ active }) => (active ? `#29EFA8` : `#dadada`)};
`;

const LinkMenuTitle = styled.p<{ active: boolean }>`
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ active }) => (active ? `#FFFFFF` : `#616D7A`)};
  margin-top: 9px;
`;
