import styled from "styled-components";

type PropsButton = {
  children: string;
  color: string;
  onclick: () => void;
};

export default function EpickBtn(props: PropsButton) {
  return (
    <EpickBut onClick={props.onclick} color={props.color}>
      {props.children}
    </EpickBut>
  );
}

const EpickBut = styled.button<{
  color?: string;
}>`
  width: 88px;
  height: 26px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 14px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: none;
  padding-top: 4px;
  ${({ color }) =>
    color === "red"
      ? `color: #FFE3E8;
      background: #FB3535;`
      : color === "blue"
      ? `color: #4CFCFC;
      background: #4685FF;`
      : color === "yellow"
      ? `color: #6D3502;
      background: #FFCB46;`
      : color === "green"
      ? `color: #6D3502;
      background: #FFCB46;`
      : `color: #fff;
      background: #000`};
`;
