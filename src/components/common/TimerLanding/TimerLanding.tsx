import React from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components";

import { ReactComponent as BorderItems } from "../../../assets/img/landingBorderItem.svg";

type TimerPropsType = {
  expiryTimestamp: Date;
};

export function TimerLanding({ expiryTimestamp }: TimerPropsType) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <TimeWrap>
      <Clock>
        <HMS>
          <BorderHMSmallBot />
          <BorderHMSmallTop />
          {hours < 10 ? `0${hours}` : hours}
        </HMS>
        <span>:</span>
        <HMS>
          <BorderHMSmallBot />
          <BorderHMSmallTop />
          {minutes < 10 ? `0${minutes}` : minutes}
        </HMS>
        <span>:</span>
        <HMS>
          <BorderHMSmallBot />
          <BorderHMSmallTop />
          {seconds < 10 ? `0${seconds}` : seconds}
        </HMS>
      </Clock>
    </TimeWrap>
  );
}

const BorderHMSmallTop = styled(BorderItems)`
  position: absolute;
  top: 0;
  left: 0;
`;

const BorderHMSmallBot = styled(BorderItems)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotate(180deg);
`;

const Clock = styled.div`
  display: flex;
  align-items: center;
  > span {
    color: #ffffff;
    opacity: 0.25;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    padding-bottom: 25px;
  }
`;

const HMS = styled.div`
  width: 56px;
  height: 60px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #202020;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 2px;
  margin: 0 5px;
  padding-top: 1px;
  color: #fff;
  position: relative;
`;

const TimeWrap = styled.div`
  span {
    width: 24px;
    height: 28px;
  }
`;
