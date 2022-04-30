import styled from "styled-components";

type PropsButton = {
  children: string;
  active?: boolean;
  disabled?: boolean;
};

export default function MultiBtn(props: PropsButton) {
  return (
    <MultiBut disabled={props.disabled} active={props.active}>
      {props.children}
    </MultiBut>
  );
}

const MultiBut = styled.button<{
  active?: boolean;
  disabled?: boolean;
}>`
  width: 60px;
  height: 32px;
  border: 1px solid #29efa8;
  border-radius: 6px;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 3px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${({ active }) =>
    active
      ? `color: #141D24; background: #29EFA8;`
      : `color: #29EFA8; background: #141D24;`}

  ${({ disabled }) =>
    disabled
      ? `opacity: 0.5;
  cursor: no-drop !important;`
      : ``}
`;
