import { MipKart } from "./MipKart";
import { RobotKart } from "./RobotKart";

type PremiumKartPassPropsType = {
  name: string | "";
  descr: string | "";
  coin?: number | null;
  robot?: boolean;
  lock: boolean;
  active: boolean;
  src: string;
};

export const PremiumKart = (props: PremiumKartPassPropsType) => {
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
      ) : (
        <RobotKart
          name={props.name}
          descr={props.descr}
          robot={props.robot}
          lock={props.lock}
          active={props.active}
          src={props.src}
        />
      )}
    </>
  );
};
