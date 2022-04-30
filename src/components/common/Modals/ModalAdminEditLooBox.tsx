import styled from "styled-components";
import TedButton from "../Button/TedButton";
import { Formik } from "formik";
import { useAdminGetOneBoxLoot } from "../../../hooks/useAdminGetOneBoxLoot";
import { useAdminPostEditLootBox } from "../../../hooks/useAdminPostEditLootBox";
import validationEditLootBoxSchema from "./validation/validationEditLootBoxSchema";
import Select from "react-select";
import { customStylesForGarageSelect } from "../../../utils/commonFunctions";
// import { useState } from "react";

type PropsTypeWinSpin = {
  onClose: () => void;
  setActiveId: () => void;
  idBox: number;
};

export type EditLootBoxType = {
  name: string;
  price: number;
  loot_tokens: string;
  rarity: "Gray" | "Green" | "Blue" | "Purple" | "Red" | "Yellow";
};

export function ModalAdminEditLooBox({
  setActiveId,
  onClose,
  idBox,
}: PropsTypeWinSpin) {
  const { mutate: manipulateWithBtn } = useAdminPostEditLootBox();

  const { data: activeCaseEdit } = useAdminGetOneBoxLoot(idBox);

  const addNewCase = (descrCase: EditLootBoxType) => {
    const caseEdit = {
      boxId: idBox,
      updateData: {
        mainInfo: {
          name: descrCase.name,
          price: +descrCase.price,
          rarity: descrCase.rarity,
          loot_tokens: descrCase.loot_tokens,
        },
      },
    };
    manipulateWithBtn(caseEdit);
    onClose();
    setActiveId();
  };

  const options = [
    { value: "Gray", label: "Gray" },
    { value: "Green", label: "Green" },
    { value: "Blue", label: "Blue" },
    { value: "Purple", label: "Purple" },
    { value: "Red", label: "Red" },
    { value: "Yellow", label: "Yellow" },
  ];

  return (
    <ModalContent>
      <h3>Edit Lootbox</h3>
      {activeCaseEdit?.data && (
        <Formik
          initialValues={{
            name: activeCaseEdit.data.name,
            price: activeCaseEdit.data.price,
            rarity: activeCaseEdit.data.rarity,
            loot_tokens: activeCaseEdit.data.loot_tokens,
          }}
          validationSchema={validationEditLootBoxSchema}
          onSubmit={(values, { setSubmitting }) => {
            addNewCase(values);
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
                    value={values.price}
                    error={errors.price && touched.price ? 1 : 0}
                  />
                </InputWrapperModalToken>

                <TitleIpnut>Tokens</TitleIpnut>
                <InputWrapperModalToken>
                  <InputModal
                    placeholder="Enter tokens"
                    type="text"
                    name="loot_tokens"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.loot_tokens}
                    error={errors.loot_tokens && touched.loot_tokens ? 1 : 0}
                  />
                </InputWrapperModalToken>

                <TitleIpnut>Rarity</TitleIpnut>
                <InputWrapperModalToken>
                  <Select
                    onChange={(e: any) => setFieldValue("rarity", e.value)}
                    options={options}
                    name="rarity"
                    onBlur={handleBlur}
                    styles={customStylesForGarageSelect}
                    placeholder="Enter rarity"
                    //not found error/ error={errors.loot_tokens && touched.loot_tokens ? 1 : 0}
                  />
                </InputWrapperModalToken>

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
      )}
    </ModalContent>
  );
}

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
  height: 550px;

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
