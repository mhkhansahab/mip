import Modal  from "../Modal";
import styled from "styled-components";
import { TedButton } from "../Button/TedButton";
import { Formik } from "formik";
import validationForgetPassword from "./validation/validationForgetPasswordSchema";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalForgetPassword({ visible, onClose }: PropsTypeWinSpin) {
  return (
    <ModalWrapper visible={visible} onClose={() => onClose()}>
      <ModalContent>
        <h3>Forget password</h3>
        <DescrModal>
          We have sent you a recovery code by email.
          <br />
          Enter it in the box below
        </DescrModal>
        <Formik
          initialValues={{
            code: "",
          }}
          validationSchema={validationForgetPassword}
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
              <form onSubmit={handleSubmit}>
                <TitleIpnut>Code</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter new password"
                    type="text"
                    name="code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                  />
                </InputWrapperModalToken>
                {errors.code && touched.code && errors.code}

                <ModalButton>
                  <TedButton
                    type="submit"
                    disabled={isSubmitting}
                    size="modal"
                    width="338"
                    color="green"
                    onclick={() => {}}
                  >
                    Confirm
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

const DescrModal = styled.h5`
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #616d7a;
  margin-top: 17px;
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
  height: 342px;

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
