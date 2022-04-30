import Modal from "../Modal";
import styled from "styled-components";
import loadable from '@loadable/component';
import { Formik } from "formik";
import validationProfileSettingsSchema from "./validation/validationProfileSettingsSchema";
const TedButton = loadable(() => import('../Button/TedButton'));

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalProfileSettings({ visible, onClose }: PropsTypeWinSpin) {
  return (
    <ModalWrapper visible={visible} onClose={() => onClose()}>
      <ModalContent>
        <h3>Profile Settings</h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationProfileSettingsSchema}
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
                <TitleIpnut>E-mail</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </InputWrapperModalToken>
                {errors.email && touched.email && errors.email}

                <TitleIpnut>Password</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </InputWrapperModalToken>
                {errors.password && touched.password && errors.password}

                <TitleIpnut>New</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter new password"
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                  />
                </InputWrapperModalToken>
                {errors.newPassword &&
                  touched.newPassword &&
                  errors.newPassword}

                <TitleIpnut>Confirm new password</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Confirm new password"
                    type="password"
                    name="confirmNewPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmNewPassword}
                  />
                </InputWrapperModalToken>
                {errors.confirmNewPassword &&
                  touched.confirmNewPassword &&
                  errors.confirmNewPassword}

                <ModalButton>
                  <TedButton
                    type="submit"
                    disabled={isSubmitting}
                    size="modal"
                    width="338"
                    color="green"
                    onclick={() => {}}
                  >
                    Save
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
  z-index: 31;
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
  height: 526px;

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
