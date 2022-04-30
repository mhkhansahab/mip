import styled from "styled-components";
import kartLoot from "../../../assets/img/kartPassPremLoot.png";
import smallDiamond from "../../../assets/img/smallDiamond.svg";
import lockPass from "../../../assets/img/zamokPassItem.png";
import validateImg from "../../../assets/img/validatePass.png";

type MipKartPassPropsType = {
  name: string;
  descr: string | "";
  coin: number | null;
  lock: boolean;
  active: boolean;
};

export const MipKart = (props: MipKartPassPropsType) => {
  return (
    <KartLoot active={props.active}>
      <CristalCount>
        <span>{props.coin} </span>
        <img src={smallDiamond} alt="" />
      </CristalCount>
      <TextKart>
        <h3>{}</h3>
        <p>Tokens</p>
      </TextKart>
      {props.lock ? (
        <AcceptKart>
          <img src={validateImg} alt="" />
        </AcceptKart>
      ) : (
        <LockKart>
          <img src={lockPass} alt="" />
        </LockKart>
      )}
    </KartLoot>
  );
};

const AcceptKart = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  background: #142e2f;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    z-index: 3;
  }
`;

const LockKart = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  background: #181f25;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    z-index: 3;
  }
`;

const TextKart = styled.div`
  margin: 80px 0 0 20px;
  h3 {
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #ffd63d;
    margin-top: 124px;
  }

  > img {
    margin: 125px 0 6px 8px;
  }
`;

const KartLoot = styled.div<{
  active: boolean;
}>`
  background-image: url(${kartLoot});
  width: 200px;
  height: 300px;
  border-radius: 12px;
  position: relative;
  ${props => (props.active ? `margin-bottom:50px` : `margin-top: 40px`)};
`;
