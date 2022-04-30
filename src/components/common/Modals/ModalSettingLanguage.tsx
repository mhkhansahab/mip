import Modal from "../Modal";
import styled from "styled-components";
import { Formik } from "formik";
import rusImg from "../../../assets/img/russia.png";
import engImg from "../../../assets/img/english.png";
import frcImg from "../../../assets/img/franch.png";
import { Switcher } from "../Switcher";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStylesForSettingsSelect } from "../../../utils/commonFunctions";
import { usePutManipulationSettings } from "../../../hooks/usePutManipulationSettings";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
  anim: boolean;
  sound: boolean;
  language: "English" | "Russian" | "French";
};

const options = [
  { value: "Russian", label: "Russian", image: rusImg },
  { value: "English", label: "English", image: engImg },
  { value: "French", label: "French", image: frcImg },
];

const checkImageForSelect = (label: string) => {
  if (label === "English") {
    return engImg;
  }
  if (label === "Russian") {
    return rusImg;
  }
  return frcImg;
};

const SingleValue = (props: any) => (
  <CustomOption>
    <img src={checkImageForSelect(props.data.label)} alt="" />
    <span>{props.data.label}</span>
  </CustomOption>
);

export default function ModalSettingLanguage({
  anim,
  sound,
  visible,
  onClose,
  language,
}: PropsTypeWinSpin) {
  const [switcherAnim, setSwitcherAnim] = useState<boolean>(Boolean(anim));
  const [switcherSound, setSwitcherSound] = useState<boolean>(Boolean(sound));
  const [initialValueSelect, setInitialValueSelect] = useState<{
    value: string;
    label: string;
  }>({ value: language, label: language });

  const { mutate: manipulateWithBtn } = usePutManipulationSettings();

  useEffect(() => {
    manipulateWithBtn({
      animation: switcherAnim,
      language: initialValueSelect.value,
      sound: switcherSound,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switcherAnim, initialValueSelect.value, switcherSound]);

  return (
    <ModalWrapper visible={visible} onClose={() => onClose()}>
      <ModalContent>
        <h3>Settings</h3>
        <Formik
          initialValues={{
            rus: "rus",
            eng: "eng",
            frch: "frch",
          }}
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
              <TitleIpnut>Language</TitleIpnut>
              <SelectWrapper>
                <Select
                  onChange={(e: any) =>
                    setInitialValueSelect({ value: e?.value, label: e?.label })
                  }
                  components={{ SingleValue }}
                  options={options}
                  styles={customStylesForSettingsSelect}
                  placeholder="Chose Part..."
                  value={initialValueSelect}
                  isSearchable={false}
                  formatOptionLabel={(lang: any) => (
                    <CustomOption>
                      <img src={lang.image} alt="" />
                      <span>{lang.label}</span>
                    </CustomOption>
                  )}
                />
              </SelectWrapper>
              <OtherOptions>
                <div>
                  <p>Animation</p>
                  <Switcher
                    active={switcherAnim}
                    setActive={() => setSwitcherAnim(!switcherAnim)}
                  />
                </div>
                <div>
                  <p>Sound</p>
                  <Switcher
                    active={switcherSound}
                    setActive={() => setSwitcherSound(!switcherSound)}
                  />
                </div>
              </OtherOptions>
              <form onSubmit={handleSubmit}></form>
            </ItemModal>
          )}
        </Formik>
      </ModalContent>
    </ModalWrapper>
  );
}

const OtherOptions = styled.div`
  border-top: 1px solid #25313d;

  > p {
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 27px;
  }
`;

const SelectWrapper = styled.div`
  height: 46px;
  color: #fff;
  border: none;
  background: #161d24;
  border-radius: 6px;
  margin: 9px 0 32px 0;
`;

const TitleIpnut = styled.h6`
  margin-top: 20px;
  font-size: 14px;
  line-height: 17px;
  color: #616d7a;
`;

const ModalWrapper = styled(Modal)`
  width: 380px;
  height: 303px;
`;

const ItemModal = styled.div`
  width: 345px;
  height: 303px;
  position: relative;
  text-align: left;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 303px;

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

const CustomOption = styled.div`
  display: flex;
  align-items: center;

  > img {
    margin-right: 12px;
  }
`;
