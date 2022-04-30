import styled from "styled-components";
import diamondImg from "../../../assets/img/smallDiamond.svg";
import boxImg from "../../../assets/img/smallBox.svg";
import starImg from "../../../assets/img/star.svg";

type AchievePropsType = {
  achieveType: "diamond" | "box" | "star";
  count: number;
  descr: string;
  balance: number;
  countCase: number;
};

export const Achieve = (props: AchievePropsType) => {
  return (
    <AchieveWrapper>
      {props.achieveType === "diamond" ? (
        <AchieveCount>
          <img className="diamond" src={diamondImg} alt="" />
          <span>{props.balance} MIP</span>
        </AchieveCount>
      ) : props.achieveType === "star" ? (
        <AchieveCount>
          <img className="star" src={starImg} alt="" />
          <span>+{props.count}%</span>
        </AchieveCount>
      ) : (
        <AchieveCount>
          <img className="box" src={boxImg} alt="" />
          <span>{props.countCase}</span>
        </AchieveCount>
      )}

      <AchieveDescr>{props.descr}</AchieveDescr>
    </AchieveWrapper>
  );
};

const AchieveWrapper = styled.div`
  padding: 34px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0b1014;
  border-radius: 12px;
  margin-left: 12px;
  min-width: 275px;
  box-sizing: border-box;
  @media (max-width: 1280px) {
    padding: 30px 44px;
    min-width: 250px;
  }
`;

const AchieveCount = styled.div`
  display: flex;
  align-items: center;
  cursor: context-menu;

  img {
    margin-right: 7px;
  }

  span {
    font-weight: 600;
    font-size: 26px;
    line-height: 36px;
    color: #ffffff;
  }

  .diamond {
    width: 32px;
  }

  .star {
    width: 30px;
  }

  .box {
    width: 26px;
  }
`;

const AchieveDescr = styled.p`
  cursor: context-menu;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #616d7a;
  margin-top: 10px;
`;
