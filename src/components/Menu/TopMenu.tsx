import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../../assets/img/logo.svg";
import { Cabinet } from "../common/Cabinet";
import { MenuRobotProgress } from "../common/MenuRobotProgress";
import { Timer } from "../common/TimerFreeOpen";
import { Ticket } from "../common/Ticket";
import { ProfileUserInfo } from "../../utils/commonTypes";
import smallRobot from "../../assets/img/smallRobot.png";
import { useState } from "react";
import { ReactComponent as BurgerMenuIcon } from "../../assets/img/burgerIcon.svg";
import { ReactComponent as CloseBurgerMenuIcon } from "../../assets/img/close.svg";
import { ReactComponent as Arrow } from "../../assets/img/arrow-bottom.svg";
import { linkPages } from "./LeftMenu";

type TopMenuPropsType = {
  profileData?: ProfileUserInfo;
  countCase: number;
  usedFreeBox: boolean;
};

export const TopMenu = (props: TopMenuPropsType) => {
  const history = useHistory();

  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const [personInfoOpen, setPersonInfoOpen] = useState<boolean>(false);
  const [robotsOpen, setRobotsOpen] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const time = new Date();
  const time2 = new Date();
  let tomorrow = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate() + 1,
  );

  time.setSeconds((Number(tomorrow) - Number(time)) / 1000);

  time2.setSeconds((Number(tomorrow) - Number(time)) * 0);

  return (
    <>
      <TopMenuWrapper>
        <Logo onClick={() => history.push("/")}>
          <img src={logoImg} alt="" />
        </Logo>

        <BurgerMenu onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
          {isBurgerOpen ? <CloseBurgerMenuIcon /> : <BurgerMenuIcon />}
        </BurgerMenu>

        <TopMenuContent>
          <RobotLinks>
            {props.profileData?.robots &&
              props.profileData?.robots
                .filter(robot => robot.status !== "NFT")
                .map(item => (
                  <MenuRobotProgress
                    image={item.image || smallRobot}
                    name={item.name}
                    descr={item.description || ""}
                    key={item.id}
                    marginRight={12}
                    currentExp={props.profileData?.balance_xp || 0}
                    needExp={100}
                    level={props.profileData?.level || "0"}
                  />
                ))}
          </RobotLinks>

          <SpeenLinks>
            <StyledTicket>
              <Ticket />
            </StyledTicket>

            <Timer expiryTimestamp={props.usedFreeBox ? time : time2} />
          </SpeenLinks>

          <Cabinet
            profileData={props.profileData}
            countCase={props.countCase}
          />
        </TopMenuContent>
      </TopMenuWrapper>
      {isBurgerOpen && (
        <MobileMenu>
          <HiddenBar
            title="Personal Info"
            hidden={personInfoOpen}
            click={() => setPersonInfoOpen(!personInfoOpen)}
          />
          {personInfoOpen && (
            <MobileMenuRow>
              <Cabinet
                profileData={props.profileData}
                countCase={props.countCase}
                mobile={true}
              />
              <Timer expiryTimestamp={props.usedFreeBox ? time : time2} />
            </MobileMenuRow>
          )}

          <HiddenBar
            title="Robot's Info"
            hidden={robotsOpen}
            click={() => setRobotsOpen(!robotsOpen)}
          />
          {robotsOpen && (
            <RobotLinks>
              {props.profileData?.robots &&
                props.profileData?.robots
                  .filter(robot => robot.status !== "NFT")
                  .map(item => (
                    <MenuRobotProgress
                      image={item.image || smallRobot}
                      name={item.name}
                      descr={item.description || ""}
                      key={item.id}
                      marginRight={12}
                      currentExp={props.profileData?.balance_xp || 0}
                      needExp={100}
                      level={props.profileData?.level || "0"}
                      mobile={true}
                    />
                  ))}
            </RobotLinks>
          )}

          <HiddenBar
            title="Navigation"
            hidden={navOpen}
            click={() => setNavOpen(!navOpen)}
          />
          {navOpen && (
            <NavigationBar>
              {linkPages.map(link => (
                <NavLinkWrapper
                  onClick={() => setIsBurgerOpen(false)}
                  key={link.title}
                >
                  <NavLink to={link.path}>{link.title}</NavLink>
                </NavLinkWrapper>
              ))}
            </NavigationBar>
          )}
        </MobileMenu>
      )}
    </>
  );
};

type HiddenBarPropsType = {
  title: string;
  hidden: boolean;
  click: () => void;
};

export const HiddenBar = (props: HiddenBarPropsType) => {
  return (
    <MobileMenuHiddenBar hidden={props.hidden} onClick={props.click}>
      <span>{props.title}</span> <Arrow />
    </MobileMenuHiddenBar>
  );
};

const MobileMenu = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  z-index: 30;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  padding: 20px;

  @media (min-width: 701px) {
    display: none;
  }
`;

const MobileMenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 625px) {
    flex-direction: column;
    justify-content: normal;
  }
`;

const MobileMenuHiddenBar = styled.div<{ hidden: boolean }>`
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  cursor: pointer;
  user-select: none;

  span {
    margin-right: 15px;
  }

  svg {
    fill: #fff;
    transform: rotate(${props => (props.hidden ? "0deg" : "180deg")});
    transition: 0.2s transform;
  }
`;

const NavigationBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavLinkWrapper = styled.div`
  text-transform: capitalize;
  text-align: center;

  margin-bottom: 10px;

  & > a {
    color: #fff;
    font-size: 18px;
  }
`;

const TopMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: #0b1014;
  display: flex;
  z-index: 3;

  @media (max-width: 700px) {
    justify-content: space-between;
    height: 60px;
  }
`;

const Logo = styled.div`
  height: 100%;
  padding: 0 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 162px;
  box-sizing: border-box;
  cursor: pointer;
`;

const TopMenuContent = styled.div`
  width: calc(100% - 162px);
  display: flex;
  justify-content: space-between;
  height: 100%;
  @media (max-width: 700px) {
    display: none;
  }
`;

const RobotLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1050px) and (min-width: 701px) {
    & > div:not(:first-child) {
      display: none;
    }
  }

  @media (max-width: 700px) {
    justify-content: space-between;

    & > div {
      width: 30%;
      border-radius: 15px;
      border: 1px solid #fff;
    }
  }

  @media (max-width: 550px) {
    justify-content: normal;
    flex-direction: column;

    & > div {
      width: 288px;
    }
  }
`;

const SpeenLinks = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTicket = styled.div`
  margin-right: 42px;

  @media (max-width: 1400px) {
    display: none;
  }
`;

const BurgerMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 35px;
  user-select: none;

  > svg {
    fill: #fff;
    transform: scale(1.5);
    cursor: pointer;
    width: 18px;

    &:hover {
      fill: #29efa8;
    }
  }

  @media (min-width: 701px) {
    display: none;
  }
`;
