import React from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components";

type TimerPropsType = {
  expiryTimestamp: Date;
};

export default function TimerPass({ expiryTimestamp }: TimerPropsType) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <Wrapper>
      <TimeWrap>
        <Clock>
          <HMS>{hours < 10 ? `0${hours}` : hours}</HMS>:
          <HMS>{minutes < 10 ? `0${minutes}` : minutes}</HMS>:
          <HMS>{seconds < 10 ? `0${seconds}` : seconds}</HMS>
        </Clock>
      </TimeWrap>
    </Wrapper>
  );
}

const Clock = styled.div`
  display: flex;
  align-items: center;
`;

const HMS = styled.div`
  height: 38px;
  width: 44px;
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #202020;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 2px;
  margin: 0 5px;
  font-size: 20px;
`;

const Wrapper = styled.div`
  cursor: context-menu;
  height: 90px;
  display: flex;
  align-items: center;
`;

const TimeWrap = styled.div`
  color: #ffffff;
  span {
    width: 24px;
    height: 28px;
  }
`;
