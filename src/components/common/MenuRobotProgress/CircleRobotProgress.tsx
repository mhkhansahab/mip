import styled from "styled-components";

type CircleRobotProgressPropsType = {
  currentExp: number;
  needExp: number;
  level: string;
  unActive?: boolean;
  image: string;
};

export const CircleRobotProgress = (props: CircleRobotProgressPropsType) => {
  const needPercent = (props.currentExp / props.needExp) * 100;
  const degrees = (170 * needPercent) / 100;

  return (
    <CircleProgressWrapper deg={degrees} unActive={props.unActive}>
      <div className="circle">
        <div className="mask full">
          <div className="fill"></div>
        </div>
        <div className="mask half">
          <div className="fill"></div>
        </div>
        <div className="inside-circle">
          <img src={props.image} alt="" />
          <div className="count-level">
            <span>{props.level}</span>
          </div>
        </div>
      </div>
    </CircleProgressWrapper>
  );
};

const CircleProgressWrapper = styled.div<{ deg: number; unActive?: boolean }>`
  width: 42px;
  height: 42px;
  margin: 0 12px;
  background: ${props => (props.unActive ? `#1F2933` : `#fefcff`)};
  border-radius: 50%;
  transform: rotate(135deg);

  .circle .mask,
  .circle .fill {
    width: 42px;
    height: 42px;
    position: absolute;
    border-radius: 50%;
  }

  .circle .mask {
    clip: rect(0px, 42px, 42px, 21px);
  }

  .inside-circle {
    width: 38px;
    height: 38px;
    margin-top: 2px;
    margin-left: 2px;

    border-radius: 50%;
    background: #11171e;
    color: #29efa8;
    position: absolute;
    z-index: 100;
    font-weight: 700;
    font-size: 16px;

    display: flex;
    justify-content: center;
    align-items: center;

    transform: rotate(-135deg);
    > img {
      height: 30px;
      border-radius: 50%;
    }
  }

  .count-level {
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 18px;
    height: 18px;
    background: ${props => (props.unActive ? `#1F2933` : `#29efa8`)};
    border-radius: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: ${props => (props.unActive ? `#616D7A` : `#00301b`)};
    }
  }

  /* color animation */

  /* 3rd progress bar */
  .mask .fill {
    clip: rect(0px, 21px, 42px, 0px);
    background-color: ${props => (props.unActive ? `#1F2933` : `#29efa8`)};
  }

  .mask.full,
  .circle .fill {
    animation: fill ease-in-out 3s;
    transform: ${props => `rotate(${props.deg}deg)`};
  }

  @keyframes fill {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: ${props => `rotate(${props.deg}deg)`};
    }
  }
`;
