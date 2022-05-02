import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import kartFree from "../../../assets/img/kartPassFree.png";
import { MipKart } from "./MipKart";
import { RobotKart } from "./RobotKart";
import lockPass from "../../../assets/img/zamokPassItem.png";
import validateImg from "../../../assets/img/validatePass.png";

type KartPassPropsType = {
  name: string | "";
  descr: string | "";
  coin?: number | null;
  robot?: boolean;
  lock: boolean;
  active: boolean;
  src: string;
};

const FreeKart = (props: KartPassPropsType) => {
  return (
    <>
      {props.coin ? (
        <MipKart
          name={props.name}
          descr={props.descr}
          coin={props.coin}
          lock={props.lock}
          active={props.active}
        />
      ) : props.robot ? (
        <RobotKart
          name={props.name}
          descr={props.descr}
          robot={props.robot}
          lock={props.lock}
          active={props.active}
          src={props.src}
        />
      ) : (
        <KartFree active={props.active} lock={props.lock}>
          {props.lock ? (
            <AcceptKart>
              <LazyLoadImage
                alt={''}
                effect="blur"
                src={validateImg} />
            </AcceptKart>
          ) : (
            <LockKart>
              <LazyLoadImage
                alt={''}
                effect="blur"
                src={lockPass} />
            </LockKart>
          )}
        </KartFree>
      )}
    </>
  );
};

export default FreeKart;

const KartFree = styled.div<{
  active: boolean;
  lock: boolean;
}>`
  background-image: url(${kartFree});
  width: 200px;
  height: 300px;
  border-radius: 12px;
  position: relative;
  ${props => (props.active ? `margin-bottom:50px` : `margin-top: 40px`)};
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

  > span > img {
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

  > span > img {
    z-index: 3;
  }
`;
