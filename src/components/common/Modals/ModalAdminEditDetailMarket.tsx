import styled from "styled-components";
import { TedButton } from "../Button/TedButton";
import { Formik } from "formik";
import validationEditDetailMarketSchema from "./validation/validationEditDetailMarketSchema";
//import Select from "react-select";
// import {
//   checkTier,
//   customStylesForGarageSelect,
// } from "../../../utils/commonFunctions";
import { useAdminGetOneDetailsEdit } from "../../../hooks/useAdminGetOneDetailsEdit";
import { useAdminPutEditDetailMarket } from "../../../hooks/useAdminPutEditDetailMarket";
//
type PropsTypeWinSpin = {
  onClose: () => void;
  idDetail: number;
};

export type EditDetailType = {
  price: number;
  sell: number;
  name: string;
};

export function ModalAdminEditDetailMarket({
  onClose,
  idDetail,
}: PropsTypeWinSpin) {
  const { data: activeDetailEdit } = useAdminGetOneDetailsEdit(idDetail);

  const { mutate: manipulateWithBtn } = useAdminPutEditDetailMarket();

  const editDetails = (descrCase: EditDetailType) => {
    const caseEdit = {
      partId: idDetail,
      updateData: {
        updatePart: {
          price: +descrCase.price,
          sell: +descrCase.sell,
          name: descrCase.name,
        },
      },
    };
    manipulateWithBtn(caseEdit);
    onClose();
  };

  // const options = [
  //   { value: "Fanatic", label: "Tier 1" },
  //   { value: "Adept", label: "Tier 2" },
  //   { value: "Initiate", label: "Tier 3" },
  // ];

  return (
    <ModalContent>
      <h3>Edit Detail</h3>
      {activeDetailEdit?.data && (
        <Formik
          initialValues={{
            name: activeDetailEdit.data.name,
            price: activeDetailEdit.data.price || 0,
            sell: activeDetailEdit.data.sell || 0,
            //tier: checkTier(activeDetailEdit.data.partparams),
          }}
          validationSchema={validationEditDetailMarketSchema}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodiess */
          }) => (
            <ItemModal>
              <form onSubmit={handleSubmit}>
                <TitleIpnut>Name</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name && touched.name ? 1 : 0}
                  />
                </InputWrapperModalToken>

                <TitleIpnut>Price</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter price"
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price || 0}
                    error={errors.price && touched.price ? 1 : 0}
                  />
                </InputWrapperModalToken>

                <TitleIpnut>Sell</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter price"
                    type="text"
                    name="sell"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sell || 0}
                    error={errors.sell && touched.sell ? 1 : 0}
                  />
                </InputWrapperModalToken>

                {/* <TitleIpnut>Tier</TitleIpnut>
                <InputWrapperModalToken>
                  <SelectError
                    onChange={(e: any) => setFieldValue("tier", e.value)}
                    options={options}
                    name="tier"
                    onBlur={handleBlur}
                    styles={customStylesForGarageSelect}
                    placeholder="Enter tier"
                    error={errors.tier && touched.tier ? 1 : 0}
                  />
                </InputWrapperModalToken> */}

                <ModalButton>
                  <TedButton
                    type="submit"
                    disabled={isSubmitting}
                    size="modal"
                    width="338"
                    color="green"
                    onclick={() => editDetails(values)}
                  >
                    Confirm
                  </TedButton>
                </ModalButton>
              </form>
            </ItemModal>
          )}
        </Formik>
      )}
    </ModalContent>
  );
}

// const SelectError = styled(Select)<{
//   error?: number;
// }>`
//   border: 1px solid ${props => (props.error ? "#ff0000" : "#161d24")};
// `;

const TitleIpnut = styled.h6`
  margin-top: 20px;
  font-size: 14px;
  line-height: 17px;
  color: #616d7a;
`;

const InputModal = styled.input<{
  error?: number;
}>`
  width: 317px;
  height: 44px;
  background: #161d24;
  border-radius: 6px;
  border: 1px solid ${props => (props.error ? "#ff0000" : "#161d24")};
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
  height: 450px;

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
