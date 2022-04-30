import styled from "styled-components";

type SwitcherPropsType = {
  active: boolean;
  setActive: () => void;
};

export function Switcher(props: SwitcherPropsType) {
  return (
    <SwitcherWrapper active={props.active} onClick={props.setActive}>
      <PointerStatys></PointerStatys>
    </SwitcherWrapper>
  );
}

const PointerStatys = styled.div``;

const SwitcherWrapper = styled.div<{
  active: boolean;
}>`
  border-radius: 6px;
  height: 20px;
  width: 44px;
  background-color: ${props => (props.active ? ` #29EFA8` : ` #283542`)};
  transition: background-color 0.4s;
  padding: 2px;
  :hover {
    cursor: pointer;
  }
  > div {
    border-radius: 6px;
    background-color: #616d7a;
    height: 20px;
    width: 20px;
    top: 2px;

    transition: margin-left 0.4s;
    ${props =>
      props.active
        ? `margin-left:22px; background-color: #00301B;`
        : `margin-left:2px; background-color: #616D7A;`}
  }
`;
