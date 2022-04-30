import Modal from "../Modal";
import styled from "styled-components";
import { TedButton } from "../Button/TedButton";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalSignIn({ visible, onClose }: PropsTypeWinSpin) {
  return (
    <ModalWrapper visible={visible} onClose={() => onClose()}>
      <ModalContent>
        <h3>Sign In</h3>
        <ItemModal>
          <h6>E-mail</h6>
          <InputWrapperModalToken>
            <input placeholder="Enter your email"></input>
          </InputWrapperModalToken>
          <h6>Password</h6>
          <InputWrapperModalToken>
            <input placeholder="Enter your password"></input>
          </InputWrapperModalToken>
          <h6>New passwor</h6>
          <InputWrapperModalToken>
            <input placeholder="Enter new password"></input>
          </InputWrapperModalToken>
          <h6>Confirm new password</h6>
          <InputWrapperModalToken>
            <input placeholder="Confirm new password"></input>
          </InputWrapperModalToken>
        </ItemModal>
        <ModalButton>
          <TedButton size="modal" width="338" color="green" onclick={() => { }}>
            Login
          </TedButton>
          <p>I already have an account</p>
        </ModalButton>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled(Modal)`
  height: 425px;
`;

const InputWrapperModalToken = styled.div`
  margin-top: 9px;

  > input {
    width: 317px;
    height: 46px;
    background: #161d24;
    border-radius: 6px;
    border: none;
    font-size: 14px;
    line-height: 17px;
    padding: 0 12px;
    color: #ffffff;
    ::-webkit-input-placeholder {
      color: #25313d;
    }
    ::-moz-placeholder {
      color: #25313d;
    }
  }
`;

const ModalButton = styled.div`
  display: flex;
  margin-top: 34px;
  flex-direction: column;

  > p {
    margin-top: 20px;
    font-size: 14px;
    line-height: 17px;
    color: #29efa8;
  }
`;

const ItemModal = styled.div`
  width: 345px;
  position: relative;
  text-align: left;

  > h6 {
    margin-top: 20px;
    font-size: 14px;
    line-height: 17px;
    color: #616d7a;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 563px;

  background: linear-gradient(45deg, #1f2933 3%, #0e141a 3%);
  border-radius: 12px;
  color: #ffffff;
  text-align: center;

  > h3 {
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    margin-top: 32px;
  }

  > img {
    margin-top: 12px;
  }
`;
