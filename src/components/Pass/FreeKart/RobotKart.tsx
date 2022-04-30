import styled from "styled-components";
import kartLoot from "../../../assets/img/passRobotFreeBG.png";
import lockPass from "../../../assets/img/zamokPassItem.png";
import validateImg from "../../../assets/img/validatePass.png";
import { imageRoute } from "../../../utils/api";

type KartPassPropsType = {
  name?: string | "";
  descr?: string | "";
  coin?: string | "";
  robot?: boolean;
  lock: boolean;
  active: boolean;
  src: string;
};

export const RobotKart = (props: KartPassPropsType) => {
  return (
    <KartLoot lock={props.lock} active={props.active}>
      <ItemImgPass src={`${imageRoute}${props.src}`} alt="" />

      <TextKart>
        <h3>{props.name}</h3>
        <p>{props.descr}</p>
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

const ItemImgPass = styled.img`
  height: 208px;
  padding-top: 33px;
`;

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
  margin-left: 20px;
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

const KartLoot = styled.div<{
  lock: boolean;
  active: boolean;
}>`
  background-image: url(${kartLoot});
  width: 200px;
  height: 300px;
  border-radius: 12px;
  position: relative;
  ${props => (props.active ? `margin-bottom:50px` : `margin-top: 40px`)};
`;
