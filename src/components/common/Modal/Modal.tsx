import { ReactChild } from "react";
import styled from "styled-components";

type ModalPropsType = {
  visible: boolean;
  onClose: () => void;
  children: ReactChild;
  center?: boolean;
  noClosing?: boolean;
  noContent?: boolean;
};

export const Modal = (props: ModalPropsType) => {
  return (
    <ModalWrapper visible={props.visible}>
      <DarkBackground
        onClick={props.noClosing ? () => {} : props.onClose}
      ></DarkBackground>
      {props.noContent ? (
        props.children
      ) : (
        <ModalContent center={props.center}>{props.children}</ModalContent>
      )}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<{
  visible: boolean;
}>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: ${props => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 31;
`;

const DarkBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);

  :hover {
    cursor: pointer;
  }
`;

const ModalContent = styled.div<{ center?: boolean }>`
  position: relative;
  border-radius: 6px;
  min-width: 380px;
  min-height: 303px;
  background: #0e141a;
  z-index: 32;
  border-radius: 12px;
  z-index: ${props =>
    props.center &&
    `
    display:flex;
    justify-content:center;
    align-items:center;
  `};
`;
