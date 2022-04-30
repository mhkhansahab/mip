import React from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components";
import light from "../../../assets/img/greenLight.png";

type TimerPropsType = {
  expiryTimestamp: Date;
};

export default function Timer({ expiryTimestamp }: TimerPropsType) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <Wrapper>
      <Img>
        <img src={light} alt="" />
      </Img>
      <Time>
        <TimeWrap>
          <p>Every day free spin</p>
          <Clock>
            <HMS>{hours < 10 ? `0${hours}` : hours}</HMS>:
            <HMS>{minutes < 10 ? `0${minutes}` : minutes}</HMS>:
            <HMS>{seconds < 10 ? `0${seconds}` : seconds}</HMS>
          </Clock>
        </TimeWrap>
      </Time>
    </Wrapper>
  );
}

const Clock = styled.div`
  display: flex;
  align-items: center;
`;

const HMS = styled.div`
  height: 26px;
  width: 38px;
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
  padding-top: 1px;
`;

const Wrapper = styled.div`
  cursor: context-menu;
  height: 90px;
  display: flex;
  align-items: center;
  background: #0b1014;
  width: 250px;

  @media (max-width: 1280px) {
    width: 213px;
  }

  @media (max-width: 700px) {
    width: 288px;
    background: none;
    border: 1px solid #fff;
    border-radius: 15px;
    justify-content: space-around;
    padding: 9px 0;
    height: auto;
    margin-bottom: 15px;
  }
`;

const Img = styled.div`
  margin-right: 11px;
  img {
    height: 54px;
  }

  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

const Time = styled.div``;

const TimeWrap = styled.div`
  color: #ffffff;
  margin-bottom: 8px;
  p {
    font-size: 14px;
    line-height: 17px;
    margin: 0 0 8px 5px;
  }
  span {
    width: 24px;
    height: 28px;
  }
`;
