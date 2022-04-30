import styled from "styled-components";
import { ReactComponent as BGItemL } from "../../assets/img/landingBGItemLeft.svg";
import { ReactComponent as BGItemR } from "../../assets/img/landingBGItemRight.svg";
import passBlueItem from "../../assets/img/blueTiket.png";
import petItem from "../../assets/img/goldTiket.png";
import passItem from "../../assets/img/purpleTiket.png";
import { ReactComponent as EllipseRob } from "../../assets/img/ellipseMarket.svg";
import bgItem from "../../assets/img/landingEffectItem.svg";
import TedButton from "../common/Button/TedButton";
import { connect, ticketPay } from "../../metamask/balanceAndGaragePaidExample";

type PropsTypeLanding = {
  type: "head" | "pass" | "pet" | "body";
  ticketId?: number;
  disable?: boolean;
};

export default function LandingItem(props: PropsTypeLanding) {
  const handlePayTicket = (ticketId: number) => {
    connect().then(() => {
      ticketPay(ticketId);
    });
  };

  return (
    <HeadItem>
      <RobotItemWrap>
        {props.type === "pass" ? (
          <img src={passBlueItem} alt="" />
        ) : props.type === "body" ? (
          <img src={passItem} alt="" />
        ) : (
          <img src={petItem} alt="" />
        )}

        <EllipceRobot type={props.type} />
        <EllipceRobot2 />
      </RobotItemWrap>

      <TextItemWrap>
        <h4>MINT</h4>
        <h2>
          {props.type === "pass"
            ? "PREMIUM PASS"
            : props.type === "body"
            ? "BODY"
            : "PET PASS"}
        </h2>
        <p>
          Limited to 3 per account
          <br />
          Yo can only mint based on your W/L
        </p>

        <ButtonWrap>
          <TedButton
            color="blue"
            onclick={() => handlePayTicket(props.ticketId || 0)}
            size="big"
            width="192"
            children="ACTIVATE TICKET"
            active={true}
            disabled={props.disable}
          />
        </ButtonWrap>
      </TextItemWrap>

      <BGItemLeftTop />
      <BGItemLeftBot />
      <BGItemRightBot />
      <BGItemRightTop />
    </HeadItem>
  );
}

const TextItemWrap = styled.div`
  text-align: center;
  color: #a7b0cb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h2 {
    margin: 8px 0 16px 0;
    font-size: 32px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ffffff;
    font-family: Glitch;
  }

  > h4 {
    font-size: 16px;
    line-height: 16px;
    margin-top: 40px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
  }
`;

const ButtonWrap = styled.div`
  margin: 20px 0 32px 0;
  display: flex;

  @media (max-width: 375px) {
    align-items: center;
  }

  > div {
    max-width: 192px;
    @media (max-width: 1280px) {
      max-width: 140px;
    }
  }
`;

const RobotItemWrap = styled.div`
  margin-right: 30px;
  position: absolute;

  height: 100px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  top: -20px;

  > img {
    z-index: 1;
    @media (max-width: 1280px) {
      height: 310px;
      margin-top: -60px;
    }
  }
`;

const EllipceRobot = styled(EllipseRob)`
  fill: #f4e458;
  position: absolute;
  top: -60px;
`;

const BGItemLeftTop = styled(BGItemL)`
  position: absolute;
  left: -3px;
  top: -3px;
  fill: #f4e458;
`;
const BGItemRightBot = styled(BGItemL)`
  position: absolute;
  right: -3px;
  bottom: -3px;
  transform: rotate(180deg);
  fill: #f4e458;
`;

const BGItemLeftBot = styled(BGItemR)`
  position: absolute;
  left: -3px;
  bottom: -3px;
  fill: #f4e458;
`;

const BGItemRightTop = styled(BGItemR)`
  position: absolute;
  right: -3px;
  top: -3px;
  transform: rotate(180deg);
  fill: #f4e458;
`;

const EllipceRobot2 = styled(EllipseRob)`
  fill: #78f7ff;
  position: absolute;
  height: 160px;
  top: -60px;
`;

const HeadItem = styled.div`
  background-image: url(${bgItem});
  width: 494px;
  height: 368px;
  position: relative;
  border: 1px solid #234b6b;
  margin-top: 95px;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;

  :nth-child(2n) {
    margin: 0 40px 95px 40px;
    @media (max-width: 1280px) {
      margin: 0 20px 75px 20px;
    }
  }
  fill: #ffc155;

  @media (max-width: 1600px) {
    width: 460px;
    height: 415px;
  }
  @media (max-width: 1500px) {
    width: 440px;
    height: 415px;
  }
  @media (max-width: 1430px) {
    width: 410px;
    height: 400px;
  }
  @media (max-width: 1340px) {
    width: 390px;
    height: 400px;
  }
  @media (max-width: 1280px) {
    width: 365px;
    height: 315px;
  }
  @media (max-width: 1180px) {
    width: 440px;
    height: 375px;
  }
  @media (max-width: 820px) {
    width: 440px;
    height: 310px;
  }
  @media (max-width: 480px) {
    width: 400px;
  }
  @media (max-width: 414px) {
    width: 368px;
  }
  @media (max-width: 375px) {
    width: 300px;
  }
`;
