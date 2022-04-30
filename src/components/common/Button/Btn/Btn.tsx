import styled from "styled-components";

type PropsButton = {
  children: string;
  width: string;
  color: "yellow" | "blue" | "green";
  size: "big" | "medium" | "small" | "modal";
  active: boolean;
  onclick: () => void;
};

export default function Btn(props: PropsButton) {
  return (
    <But
      onClick={props.onclick}
      active={props.active}
      width={props.width}
      color={props.color}
      size={props.size}
    >
      {props.children}
    </But>
  );
}

const But = styled.button<{
  width?: string;
  color?: string;
  size?: string;
  active?: boolean;
}>`
  font-weight: bold;
  border-radius: 6px;
  width: ${props => props.width}px;

  ${({ size }) =>
    size === "big"
      ? `font-size: 18px; height: 60px;`
      : size === "medium"
      ? `font-size: 14px; height: 40px;`
      : size === "small"
      ? `font-size: 14px; height: 32px;`
      : size === "modal"
      ? `font-size: 14px; height: 48px;`
      : ""};

  ${props =>
    props.color === "yellow"
      ? `color: #6D3502; border: 1px solid #ffe74e;
      background: linear-gradient(180deg, #fff659 0%, #ff8d06 100%);`
      : props.color === "blue" && props.active
      ? `color: #FFFFFF; border: none;
      background: linear-gradient(180deg, #0CC7EF -5.47%, #0A80D1 79.16%);`
      : props.color === "blue"
      ? `color: #003752; border: none;
      background: linear-gradient(180deg, #0CC7EF -5.47%, #0A80D1 79.16%);`
      : props.color === "green" && props.active
      ? `color: #29EFA8; border: 1px solid #00301B; 
      background: #00301B;`
      : props.color === "green"
      ? `color: #00301B; border: 1px solid #25E79F; 
      background: linear-gradient(180deg, #29EFA8 20%, #00A355 100%);`
      : ""};
`;
