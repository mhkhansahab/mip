import leadersPhoto from "../../assets/img/leadersPhoto.png";
import box from "../../assets/img/smallBox.svg";
import diamond from "../../assets/img/smallDiamond.svg";
import { ReactComponent as BorderLeader } from "../../assets/img/leaderBorder.svg";
import { ReactComponent as BorderLeader2 } from "../../assets/img/leaderBorder2.svg";
import { ReactComponent as BorderLeader3 } from "../../assets/img/leaderBorder3.svg";
import { ReactComponent as EllipseLeader } from "../../assets/img/leaderEllipse.svg";
import styled from "styled-components";

export type LeaderPropsType = {
  data: {
    id: number;
    place: number;
    userName: string;
    earn: number;
  };
};

export function LeaderPosition(props: LeaderPropsType) {
  return (
    <NumberPosition place={props.data.place}>
      <LeaderProfile>
        {props.data.place === 1 ? (
          <BGPhoto>
            <Border />
            <Ellipse />
          </BGPhoto>
        ) : props.data.place === 2 ? (
          <BGPhoto>
            <Border2 />
            <Ellipse2 />
          </BGPhoto>
        ) : (
          <BGPhoto>
            <Border3 />
            <Ellipse3 />
          </BGPhoto>
        )}

        <img src={leadersPhoto} alt="" />
        <PlaceLeader place={props.data.place}>{props.data.place}</PlaceLeader>
      </LeaderProfile>

      <AboutLeaders>
        <NameLeaders>{props.data.userName}</NameLeaders>

        <InnerInfo>
          <Boxes>
            <img src={box} alt="" />
            <span>2</span>
          </Boxes>
          <Diamonds>
            <img src={diamond} alt="" />
            <span>{props.data.earn} MIP</span>
          </Diamonds>
        </InnerInfo>
      </AboutLeaders>
    </NumberPosition>
  );
}

const PlaceLeader = styled.div<{
  place: number;
}>`
  position: absolute;
  bottom: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 64px;
  width: 64px;

  box-sizing: border-box;

  font-size: 28px;
  line-height: 34px;

  ${({ place }) =>
    place === 1
      ? `color: #e18601;background: linear-gradient(180deg, #ffe57d 0%, #ffcc44 100%);
  border: 2px solid #ffc42c;`
      : place === 2
      ? `color: #717171;background: linear-gradient(180deg, #E4E5EA 0%, #8F8E8C 100%);
      border: 2px solid #E0E1E5;`
      : `color: #471E07;background: linear-gradient(180deg, #A66C4B 0%, #582304 100%);
      border: 2px solid #763E1F;`}
`;

const BGPhoto = styled.div``;

const InnerInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Boxes = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    color: #ffffff;
    margin-left: 6px;
  }
`;

const Diamonds = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    color: #ffd63d;
    margin-left: 6px;
  }
`;

const NameLeaders = styled.div`
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
`;

const Ellipse = styled(EllipseLeader)`
  fill: #ffb800;
  position: absolute;
  top: -78px;
  left: -36px;
`;

const Ellipse2 = styled(EllipseLeader)`
  fill: #ffffff;
  position: absolute;
  top: -78px;
  left: -36px;
`;

const Ellipse3 = styled(EllipseLeader)`
  fill: #df5000;
  position: absolute;
  top: -78px;
  left: -36px;
`;

const Border = styled(BorderLeader)``;

const Border2 = styled(BorderLeader2)``;

const Border3 = styled(BorderLeader3)``;

const NumberPosition = styled.div<{
  place: number;
}>`
  width: 237px;
  height: 258px;
  ${({ place }) => (place > 1 ? `margin-top: 80px;` : ``)}
`;

const LeaderProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;

  > img {
    position: absolute;
  }
`;

const AboutLeaders = styled.div`
  margin-top: 30px;
  text-align: center;
`;
