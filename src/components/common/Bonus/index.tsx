import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import bonus from "../../../../src/assets/img/Bonus.png";
import smallDiamond from "../../../assets/img/smallDiamond.svg";

type BonusProps = {
  currentProg: string | number;
  needProg: string | number;
  rewardCoin: string | number;
  nameBonus: string;
  descrBonus: string;
};

export default function Bonus(props: BonusProps) {
  return (
    <WrapperBonus>
      <NameBonus>
        <Img>
        <LazyLoadImage
                        alt={''}
                        effect="blur"
                        src={bonus} />
        </Img>
        <Descr>
          <h3>{props.nameBonus}</h3>
          <p>{props.descrBonus}</p>
        </Descr>
      </NameBonus>
      <InfoBonus>
        <Progress currentProg={props.currentProg} needProg={props.needProg}>
          {props.currentProg}/{props.needProg}
        </Progress>
        <Reward>
          + {props.rewardCoin} MIP
          <LazyLoadImage
                        alt={''}
                        effect="blur"
                        src={smallDiamond} />
        </Reward>
      </InfoBonus>
    </WrapperBonus>
  );
}

const WrapperBonus = styled.div`
  background: #0b1014;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  padding: 0 20px;
`;

const NameBonus = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.div`
  img {
    height: 58px;
  }
`;

const Descr = styled.div`
  margin-left: 12px;
  h3 {
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }
`;

const InfoBonus = styled.div`
  display: flex;
  align-items: center;
`;

const Progress = styled.div<{
  currentProg: string | number;
  needProg: string | number;
}>`
  background: #6d3502;
  color: #ffbf1a;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  ${props =>
    props.currentProg === props.needProg
      ? `background: #0c2d3c;
      color: #0A9EDE;`
      : `background: #3c3314;
      color: #ffbf1a;`};
`;

const Reward = styled.div`
  color: #ffd63d;
  font-size: 16px;
  line-height: 19px;
  margin-right: 6px;
  display: flex;
  align-items: center;

  img {
    margin-left: 5px;
  }
`;
