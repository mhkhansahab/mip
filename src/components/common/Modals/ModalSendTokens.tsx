import Modal from "../Modal";
import styled from "styled-components";
import { TedButton } from "../Button/TedButton";
import { Formik } from "formik";
import smallDiamond from "../../../assets/img/smallDiamond.svg";
import validationSendTokensSchema from "./validation/validationSendTokensSchema";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalSendTokens({ visible, onClose }: PropsTypeWinSpin) {
  return (
    <ModalWrapper visible={visible} onClose={() => onClose()}>
      <ModalContent>
        <h3>Send tokens</h3>
        <Formik
          initialValues={{
            wallet: "",
            sum: "",
          }}
          validationSchema={validationSendTokensSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <ItemModal>
              <TitleIpnut>Your balance</TitleIpnut>
              <CristalCount>
                <img src={smallDiamond} alt="" />
                <span>6674</span>
              </CristalCount>
              <form onSubmit={handleSubmit}>
                <TitleIpnut>Wallet</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter your wallet"
                    type="text"
                    name="wallet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.wallet}
                  />
                </InputWrapperModalToken>
                {errors.wallet && touched.wallet && errors.wallet}

                <TitleIpnut>Sum</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter your password"
                    type="text"
                    name="sum"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sum}
                  />
                </InputWrapperModalToken>
                {errors.sum && touched.sum && errors.sum}

                <ModalButton>
                  <TedButton
                    type="submit"
                    disabled={isSubmitting}
                    size="modal"
                    width="338"
                    color="green"
                    onclick={() => {}}
                  >
                    Send
                  </TedButton>
                </ModalButton>
              </form>
            </ItemModal>
          )}
        </Formik>
      </ModalContent>
    </ModalWrapper>
  );
}

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 9px;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffd63d;
  }

  > img {
    margin-right: 10px;
  }
`;

const TitleIpnut = styled.h6`
  margin-top: 20px;
  font-size: 14px;
  line-height: 17px;
  color: #616d7a;
`;

const InputModal = styled.input`
  width: 317px;
  height: 46px;
  background: #161d24;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  color: #ffffff !important;
  ::-webkit-input-placeholder {
    color: #25313d;
  }
  ::-moz-placeholder {
    color: #25313d;
  }
`;

const ModalWrapper = styled(Modal)`
  height: 425px;
`;

const InputWrapperModalToken = styled.div`
  margin-top: 9px;
`;

const ModalButton = styled.div`
  display: flex;
  margin-top: 34px;
`;

const ItemModal = styled.div`
  width: 345px;
  position: relative;
  text-align: left;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 410px;

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
