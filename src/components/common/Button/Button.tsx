import styled from "styled-components";

type PropsButton = {
  children: string;
  width?: string;
  active?: boolean;
  typeName?: string;
  color?: "red" | "yellow" | "green" | "blue" | "";
  size?: string;
};

export default function Button(props: PropsButton) {
  return (
    <>
      {props.typeName === "multiBtn" ? (
        <MultiBtn active={props.active}>{props.children}</MultiBtn>
      ) : props.typeName === "epick" ? (
        <EpickBtn color={props.color}>{props.children}</EpickBtn>
      ) : (
        <Btn width={props.width} color={props.color} size={props.size}>
          {props.children}
        </Btn>
      )}
    </>
  );
}

const EpickBtn = styled.button<{
  color?: string;
}>`
  width: 88px;
  height: 26px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: none;
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
      : ""};
`;

const MultiBtn = styled.button<{
  active?: boolean;
}>`
  width: 60px;
  height: 32px;
  border: 1px solid #29efa8;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 3px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${({ active }) =>
    active
      ? `color: #141D24; background: #29EFA8`
      : `color: #29EFA8; background: #141D24`}
`;

const Btn = styled.button<{
  width?: string;
  color?: string;
  size?: string;
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

  ${({ color }) =>
    color === "yellow"
      ? `color: #6D3502; border: 1px solid #ffe74e;
      background: linear-gradient(180deg, #fff659 0%, #ff8d06 100%);`
      : color === "blue"
      ? `color: #003752; border: none;
      background: linear-gradient(180deg, #0CC7EF -5.47%, #0A80D1 79.16%);`
      : color === "green"
      ? `color: #00301B; border: 1px solid #25E79F; 
      background: linear-gradient(180deg, #29EFA8 20%, #00A355 100%);`
      : ""};
`;
