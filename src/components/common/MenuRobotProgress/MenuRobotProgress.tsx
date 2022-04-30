import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/img/arrow-bottom.svg";
import { CircleRobotProgress } from "./CircleRobotProgress";
import { DropdownAbout } from "./DropdownAbout";

type MenuRobotProgressPropsType = {
  currentExp: number;
  needExp: number;
  level: string;
  marginRight?: number;
  unActive?: boolean;
  name: string;
  descr: string;
  image: string;
  mobile?: boolean;
};

export const MenuRobotProgress = (props: MenuRobotProgressPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const onClick = (e: any) =>
        ref.current?.contains(e.target) || setIsOpen(false);
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }
  }, [isOpen]);

  return (
    <MenuRobotProgressWrapper
      ref={ref}
      mr={props.marginRight || 0}
      onClick={props.mobile ? () => {} : () => setIsOpen(!isOpen)}
      open={isOpen}
    >
      <CircleRobotProgress
        image={props.image}
        currentExp={props.currentExp}
        needExp={props.needExp}
        level={props.unActive ? "0" : props.level}
        unActive={props.unActive}
      />
      <MiddleTextWrapper>
        <h3>{props.name}</h3>
        <p>
          {props.currentExp} / {props.needExp} XP
        </p>
      </MiddleTextWrapper>
      {!props.unActive && !props.mobile && <ArrowSvgIcon />}
      {isOpen && !props.unActive && !props.mobile && (
        <DropdownAbout
          image={props.image}
          name={props.name}
          descr={props.descr}
          currentExp={props.currentExp}
          needExp={props.needExp}
          level={props.level}
        />
      )}
    </MenuRobotProgressWrapper>
  );
};

const MenuRobotProgressWrapper = styled.div<{ open: boolean; mr: number }>`
  font-family: Bahnschrift;
  width: 211px;
  height: 66px;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position:relative;
  margin-right: ${({ mr }) => mr}px;

  :hover {
    cursor: pointer;
  }

  svg{
    ${props => props.open && `transform: rotate(180deg);`}
    transition: .5s transform;
    } 
  }

  @media(max-width: 1440px) {
    width: 180px;
  }

  @media(max-width: 1366px) {
    width: 175px;
  }

  @media(max-width: 1280px) {
    width: 168px;
  }

  @media (max-width:700px){
    justify-content:space-around;
    margin: 0 0 15px 0;
  }

`;

const MiddleTextWrapper = styled.div`
  margin-right: 50px;
  @media (max-width: 1440px) {
    margin-right: 18px;
  }

  @media (max-width: 550px) {
    display: flex;
    margin: 0;
    width: 60%;
    justify-content: space-around;
  }

  h3 {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-bottom: 4px;
  }

  p {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }
`;

const ArrowSvgIcon = styled(Arrow)``;
