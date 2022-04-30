import Modal from "../Modal";
import styled from "styled-components";
import borderMarket from "../../../assets/img/borderMarketItem.svg";
import lootItemBorderImg from "../../../assets/img/lootItemBorder.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/modalBGItemSpin.svg";
import { TedButton } from "../Button/TedButton";
import { useHistory } from "react-router-dom";
import { useGetSellDetails } from "../../../hooks/useGetSellDetails";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
  name: string;
  imgSrc: string;
  sell: number;
  freeType: boolean;
};

export function ModalWinnerSpin(props: PropsTypeWinSpin) {
  const history = useHistory();

  const { mutate: dataSellDetail } = useGetSellDetails();

  const handleSellDetail = () => {
    dataSellDetail({ id: 0, idRob: 0 });
  };

  const closeModal = () => {
    props.onClose();
    props.freeType && history.push("/loot");
  };
  return (
    <Modal visible={props.visible} onClose={() => props.onClose()}>
      <ModalContent>
        <h3>Congratulations!</h3>
        <img src={lootItemBorderImg} alt="" />
        <ItemModal>
          <BgRobotModal src={borderMarket} alt="" />
          <CircleIconStyled />
          <RobotModal src={props.imgSrc} alt="" />
        </ItemModal>
        <TextModal>
          <h3>{props.name.split("_").slice(-2, -1).join("")}</h3>
          <p>Head</p>
        </TextModal>
        <ModalButton>
          <TedButton
            size="medium"
            width="160"
            color="green"
            onclick={() => closeModal()}
          >
            Fine
          </TedButton>
          <TedButton
            size="medium"
            width="160"
            color="blue"
            active={true}
            onclick={() => handleSellDetail()}
          >
            {`$ Sell for ${props.sell} MIP`}
          </TedButton>
        </ModalButton>
      </ModalContent>
    </Modal>
  );
}

const ModalButton = styled.div`
  display: flex;
  margin-top: 28px;

  > div {
    margin: 0 6px;
  }
`;

const CircleIconStyled = styled(CircleIcon)`
  fill: #29efa8;
  position: absolute;
  left: -60px;
  top: -70px;
`;

const RobotModal = styled.img`
  z-index: 5;
  height: 183px;
`;

const BgRobotModal = styled.img`
  position: absolute;
  height: 183px;
  left: 0px;
`;

const TextModal = styled.div`
  > h3 {
    margin: 23px 0 4px 0;
    font-size: 16px;
    line-height: 19px;
  }

  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }
`;

const ItemModal = styled.div`
  margin-top: 34px;
  width: 183px;
  height: 183px;
  position: relative;
  display: flex;
  color: #ffffff;

  > h3 {
    margin: 23px 0 4px 0;
    font-size: 16px;
    line-height: 19px;
  }

  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 408px;
  height: 455px;
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
