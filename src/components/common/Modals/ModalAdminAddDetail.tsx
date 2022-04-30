import Modal from "../Modal";
import styled from "styled-components";
import { TedButton } from "../Button/TedButton";
import { Formik } from "formik";
import { useState } from "react";
import Select from "react-select";
import { useAdminPostSearchDetails } from "../../../hooks/useAdminPostSearchDetails";
import { useAdminPutManipylationDetail } from "../../../hooks/useAdminPutManipylationDetail";
import { useAdminGetOneBoxLoot } from "../../../hooks/useAdminGetOneBoxLoot";
import { customStylesForGarageSelect } from "../../../utils/commonFunctions";
import validationAddDetailSchema from "./validation/validationAddDetailSchema";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
  idBox: number;
};

export function ModalAdminAddDetail({
  idBox,
  visible,
  onClose,
}: PropsTypeWinSpin) {
  const [valueInput, setValueInput] = useState<string>("");

  const { data: searchDetails } = useAdminPostSearchDetails(valueInput);

  const filterValues = () => {
    const newArrayDetails = searchDetails?.data.map(item => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    return newArrayDetails;
  };

  const { data: oneCaseData } = useAdminGetOneBoxLoot(+idBox);

  const newArrDetails = oneCaseData?.data.parts.map(item => item.id) || [];

  const { mutate: manipulateWithBtn } = useAdminPutManipylationDetail();

  const addNewDetal = (idDetail: number, odds: number) => {
    newArrDetails.push(idDetail);

    const addDetailData = {
      boxId: idBox,
      updateData: {
        mainInfo: {
          name: oneCaseData?.data.name || "",
          loot_tokens: Number(oneCaseData?.data.loot_tokens) || 0,
          price: oneCaseData?.data.price || 0,
          rarity: oneCaseData?.data.rarity || "Gray",
          active_status: Boolean(oneCaseData?.data.active_status) || false,
        },
        updatePart: newArrDetails.filter(item => item !== 0),
        updateOdds: [
          {
            part_id: idDetail,
            odds: odds,
          },
        ],
      },
    };
    manipulateWithBtn(addDetailData);
    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={() => onClose()}>
      <ModalContent>
        <h3>Add new Detail</h3>

        <Formik
          initialValues={{
            detail: 0,
            procent: 0,
          }}
          validationSchema={validationAddDetailSchema}
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
            /* and other goodies */
          }) => (
            <ItemModal>
              <form onSubmit={handleSubmit}>
                <TitleIpnut>Name</TitleIpnut>
                <div>
                  <Select
                    options={filterValues()}
                    onInputChange={setValueInput}
                    onChange={(e: any) => setFieldValue("detail", e?.value)}
                    name="detail"
                    styles={customStylesForGarageSelect}
                  />
                </div>

                <TitleIpnut>Win % chance</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter % chance"
                    type="text"
                    name="procent"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={+values.procent}
                  />
                </InputWrapperModalToken>
                {errors.procent && touched.procent && errors.procent}

                <ModalButton>
                  <TedButton
                    type="submit"
                    disabled={isSubmitting}
                    size="modal"
                    width="338"
                    color="green"
                    onclick={() => addNewDetal(values.detail, values.procent)}
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
  height: 550px;
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
  height: 350px;

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
