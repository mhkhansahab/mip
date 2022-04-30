import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { LinkMenu } from "../common/LinkMenu";
import { ReactComponent as SettingIcon } from "./../../assets/img/settingSprite.svg";

type LeftMenuPropsType = {
  isOpen: () => void;
};

type linkPagesType = {
  title:
    | "garage"
    | "loot"
    | "market"
    | "seasonpass"
    | "top"
    | "faq"
    | "profile"
    | "progress";
  path: string;
};

export const linkPages: linkPagesType[] = [
  { title: "profile", path: "/" },
  { title: "garage", path: "/garage/1" },
  { title: "loot", path: "/loot" },
  { title: "market", path: "/market/1" },
  { title: "seasonpass", path: "/seasonpass" },
  { title: "progress", path: "/progress" },
  { title: "top", path: "/top" },
  { title: "faq", path: "/faq" },
];

export const LeftMenu = (props: LeftMenuPropsType) => {
  const location = useLocation();

  return (
    <LeftMenuWrapper>
      {linkPages.map(link => (
        <LinkContainer key={link.title}>
          <LinkMenu
            path={link.path}
            active={
              link.path === location.pathname ||
              (location.pathname.includes(link.title) &&
                link.title !== "profile")
            }
            title={link.title}
          />
        </LinkContainer>
      ))}

      <Settings onClick={() => props.isOpen()} />
    </LeftMenuWrapper>
  );
};

const Settings = styled(SettingIcon)`
  margin: 45px 0 0 18px;
  fill: #dadada;
  :hover {
    fill: #29efa8;
    cursor: pointer;
  }
`;

const LeftMenuWrapper = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  height: calc(100vh - 90px);
  width: 90px;
  padding: 0 14px;
  box-sizing: border-box;
  background: #0b1014;
  z-index: 2;
  overflow: auto;
  padding-bottom: 30px;

  @media (max-width: 1440px) {
    height: calc(100vh - 61px);
    padding-bottom: 60px;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const LinkContainer = styled.div`
  margin-top: 30px;

  :first-child {
    margin-top: 34px;
  }

  @media (max-width: 1440px) {
    margin-top: 30px;
  }

  @media (max-width: 1366px) {
    margin-top: 20px;
  }
  @media (max-width: 1280px) {
    margin-top: 23px;
  }
`;
