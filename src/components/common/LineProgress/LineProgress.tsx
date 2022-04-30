import styled from "styled-components";

type LineProgressPropsType = {
  currentExp: number;
  needExp: number;
  level: string;
};

export const LineProgress = (props: LineProgressPropsType) => {
  const percent = (props.currentExp / props.needExp) * 100;
  return (
    <LineProgressWrapper>
      <LineWithCircle>
        <DoubleLine>
          <GrayLine></GrayLine>
          <GreenLine percent={percent}></GreenLine>
        </DoubleLine>
        <Circle>
          <span>{props.level}</span>
        </Circle>
      </LineWithCircle>
      <ExpText>
        {props.currentExp} / {props.needExp} XP
      </ExpText>
    </LineProgressWrapper>
  );
};

const LineProgressWrapper = styled.div`
  width: 159px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LineWithCircle = styled.div`
  width: 100%;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
`;

const DoubleLine = styled.div`
  width: 100%;
  height: 6px;
  position: relative;
  display: flex;
  align-items: center;
`;

const GrayLine = styled.div`
  background: #1f2933;
  border-radius: 33px;
  height: 6px;
  width: 100%;
`;

const GreenLine = styled.div<{ percent: number }>`
  height: 6px;
  width: ${({ percent }) => percent}%;
  position: absolute;
  background: #29efa8;
  border-radius: 64px;
`;

const Circle = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  background: #29efa8;
  border-radius: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: #00301b;
  }
`;

const ExpText = styled.h4`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
`;
