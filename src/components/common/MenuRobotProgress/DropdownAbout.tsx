import styled from "styled-components";
import light from "../../../assets/img/dropdownLight.png";
import { LineProgress } from "../LineProgress";

type DropdownPropsType = {
  currentExp: number;
  needExp: number;
  level: string;
  descr: string;
  name: string;
  image: string;
};

export const DropdownAbout = (props: DropdownPropsType) => {
  return (
    <DropdownAboutWrapper>
      <DropRobotImg>
        <img className="dropdownLight" src={light} alt="" />
        <img className="smallRobotIcon" src={props.image} alt="" />
      </DropRobotImg>
      <DropRobotText>
        <h4>{props.name}</h4>
        <p>{props.descr}</p>
      </DropRobotText>
      <LineProgress
        currentExp={props.currentExp}
        needExp={props.needExp}
        level={props.level}
      />
    </DropdownAboutWrapper>
  );
};

const DropdownAboutWrapper = styled.div`
  width: 211px;
  height: 207px;
  background: #0b1014;
  box-shadow: -5.95434px 35.5042px 80px rgba(0, 0, 0, 0.13),
    -3.8593px 23.012px 46.8519px rgba(0, 0, 0, 0.0987037),
    -2.29353px 13.6757px 25.4815px rgba(0, 0, 0, 0.078963),
    -1.19087px 7.10083px 13px rgba(0, 0, 0, 0.065),
    -0.485169px 2.89293px 6.51852px rgba(0, 0, 0, 0.051037),
    -0.110266px 0.657485px 3.14815px rgba(0, 0, 0, 0.0312963);
  border-radius: 12px;
  position: absolute;
  top: 74px;
  left: 0;
  padding: 13px 19px 17px 19px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DropRobotImg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;

  .dropdownLight {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 60px;
  }

  .smallRobotIcon {
    position: absolute;
    transform: rotate(0deg);
    width: 64px;
    height: 64px;
    z-index: 2;
    border-radius: 50%;
  }
`;

const DropRobotText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 16px;

  h4 {
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
    text-align: center;
    color: #616d7a;
  }
`;
