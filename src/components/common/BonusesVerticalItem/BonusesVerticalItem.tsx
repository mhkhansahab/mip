import styled from "styled-components";
import { ReactComponent as ArrowHorizontItem } from "../../../assets/img/bonusesHorArrow.svg";
import { ReactComponent as CaseImg } from "../../../assets/img/bonusesCaseItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/ellipseMarket.svg";
import dateIcon from "../../../assets/img/bonusesDateIcon.svg";
import smallDiamond from "../../../assets/img/smallDiamond.svg";

type PropsBonusesItemType = {
  caseName: string;
  caseCoin: number;
  robotName: string;
  robotDescr: string;
  addCoin: number;
};

export function BonusesVerticalItem(props: PropsBonusesItemType) {
  return (
    <ItemWrapper>
      <DateItem>
        <img src={dateIcon} alt="" />
        21.02, 13:23
      </DateItem>
      <LootWrapper>
        <ItemCase>
          <CaseImage>
            <CaseImgItem />
            <ItemEffect />
          </CaseImage>
          <CaseName>
            <div>{props.caseName}</div>
            <CristalCount>
              <img src={smallDiamond} alt="" />
              <span>{props.caseCoin} MIP</span>
            </CristalCount>
          </CaseName>
        </ItemCase>

        <ArrowVert />

        <ItemRobot>
          <RobotImage>
            <RobotImgItem />
            <ItemEffect />
          </RobotImage>
          <CaseName>
            <div>{props.robotName}</div>
            <DescrRobot>{props.robotDescr}</DescrRobot>
          </CaseName>
        </ItemRobot>
      </LootWrapper>
      <AddMIP>
        <p>+ {props.addCoin} </p>
        <img src={smallDiamond} alt="" />
      </AddMIP>
    </ItemWrapper>
  );
}

const AddMIP = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #ffd63d;
  display: flex;

  > img {
    margin-left: 9px;
  }
`;

const LootWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RobotImgItem = styled.div`
  position: absolute;
  z-index: 1;
  height: 40px;
  background-color: red;
  border-radius: 50%;
`;

const RobotImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ItemRobot = styled.div`
  display: flex;
`;

const DescrRobot = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #616d7a;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
`;

const DateItem = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #616d7a;

  > img {
    height: 17px;
    margin: 0 6px -2px 0;
  }
`;

const ItemCase = styled.div`
  display: flex;
`;

const CaseImgItem = styled(CaseImg)`
  position: absolute;
  z-index: 1;
`;

const CaseImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ItemEffect = styled(CircleIcon)`
  fill: #f82f90;
  height: 60px;
  width: 60px;
  position: absolute;
  left: -15px;
`;

const CaseName = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  margin-left: 50px;
`;

const ArrowVert = styled(ArrowHorizontItem)`
  margin: 0 50px;
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffd63d;
  }

  > img {
    margin: -1px 6px 0 0;
  }
`;
