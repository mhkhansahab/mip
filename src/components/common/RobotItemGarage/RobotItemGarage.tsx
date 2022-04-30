import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import borderGarageItem from "../../../assets/img/garageRobotBorderItem.svg";
import { ReactComponent as MaskIcon } from "../../../assets/img/maskRobotGarageItem.svg";
import { imageRoute } from "../../../utils/api";
import borderMarket from "../../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/ellipseMarket.svg";
import { TedButton } from "../Button/TedButton";
import { Modal } from "../Modal";
import diamond from "../../../assets/img/smallDiamond.svg";
import { useGetSellDetails } from "../../../hooks/useGetSellDetails";

type LootItemPropsType = {
  imgSrc: string;
  nameItems: string;
  descr: string;
  manipulate: (partId: number, type: "remove") => void;
  id: number;
  sell: number;
  name: string;
  idRob: number;
  isDisable: number | null;
};

export const RobotItemInterface = (props: LootItemPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const onClick = (e: any) =>
        ref.current?.contains(e.target) || setIsOpen(false);
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }
  }, [isOpen]);

  const [visAcceptSellDetail, setVisAcceptSellDetail] =
    useState<boolean>(false);

  const { mutate: sellDetail } = useGetSellDetails();

  const addDetail = (id: number) => {
    sellDetail({ id, idRob: props.idRob });
    setVisAcceptSellDetail(false);
  };

  return (
    <GarageItemWrapper onClick={() => setIsOpen(!isOpen)} ref={ref}>
      { !props.isDisable && <RobotGarage src={`${imageRoute}${props.imgSrc}`} alt="" /> }
      <BgContainer>
        <BgRobotGarage src={borderGarageItem} alt="" />
        <MaskIconStyled />
      </BgContainer>
      <h3>{props.name}</h3>

      <ModalItem visible={isOpen && !props.isDisable}>
        <RobotMarket src={`${imageRoute}${props.imgSrc}`} alt="" />
        <BgRobotMarket src={borderMarket} alt="" />
        <CircleIconStyled />
        <TextItem>
          <NameItems>
            {props.nameItems.split(" ").slice(-2).join(" ")}
          </NameItems>
          <DescrItems>{props.descr}</DescrItems>
          <ButtonWrapper>
            <TedButton
              onclick={() => props.manipulate(props.id, "remove")}
              size="small"
              color="green"
              width="140"
              active={false}
            >
              Take off
            </TedButton>
            <TedButton
              onclick={() => setVisAcceptSellDetail(true)}
              refresh={true}
              size="small"
              color="blue"
              width="40"
              active={true}
            >
              <Dollar>$</Dollar>
            </TedButton>
          </ButtonWrapper>
        </TextItem>
      </ModalItem>
      {visAcceptSellDetail && (
        <Modal
          visible={visAcceptSellDetail}
          onClose={() => setVisAcceptSellDetail(false)}
        >
          <ModalContent>
            <h3>Confirm your actions</h3>
            <RobotsWrapper>
              <div>
                Do you really want to sell the item? <br />
                {props.nameItems} <br />
                <Diamonds>
                  <span>for </span> <p>{props.sell}</p>{" "}
                  <img src={diamond} alt="" />
                </Diamonds>
              </div>
            </RobotsWrapper>
            <ModalButton>
              <AcceptSell onClick={() => addDetail(props.id)}>Yes</AcceptSell>
              <NotSell onClick={() => setVisAcceptSellDetail(false)}>
                No
              </NotSell>
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </GarageItemWrapper>
  );
};

const AcceptSell = styled.div`
  background: green;
  color: #fff;
`;
const NotSell = styled.div`
  background: red;
  color: #fff;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  > div {
    padding: 8px 18px;
    border-radius: 8px;
    margin: 0 25px;
    :hover {
      cursor: pointer;
    }
  }
`;

const Diamonds = styled.div`
  place-content: center;
  margin-top: 30px;
  margin-right: 8px;
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    color: #ffffff;
    margin-left: 6px;
  }

  > p {
    font-size: 16px;
    color: #ffffff;
    margin-left: 6px;
    color: #ffd63d;
  }

  > img {
    margin-left: 5px;
  }
`;

const RobotsWrapper = styled.div`
  line-height: 24px;
  display: flex;
  height: 160px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 442px;

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

const Dollar = styled.div`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  color: #0a80d1;
  margin-left: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  margin-top: 20px;

  button {
    margin-right: 8px;
  }
`;

const TextItem = styled.div`
  margin-top: 132px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescrItems = styled.div`
  margin-top: 10px;
  color: #616d7a;
  font-size: 13px;
  line-height: 14px;
`;

const NameItems = styled.div`
  text-align: center;
`;

const CircleIconStyled = styled(CircleIcon)`
  fill: #29efa8;
  position: absolute;
`;

const RobotMarket = styled.img`
  z-index: 1;
  position: absolute;
  height: 80px;
  margin-top: 15px;
`;

const BgRobotMarket = styled.img`
  position: absolute;
  margin-top: 15px;
`;

const ModalItem = styled.div<{
  visible: boolean;
}>`
  ${props => (props.visible ? `display: flex` : `display: none;`)};
  justify-content: center;
  position: absolute;
  width: 210px;
  height: 240px;
  border-radius: 12px;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  top: 145px;
  z-index: 21;
  cursor: auto;
`;

const MaskIconStyled = styled(MaskIcon)`
  fill: #29efa8;
  position: absolute;
  top: -7px;
`;

const RobotGarage = styled.img`
  height: 70px;
  margin-top: 15px;
  z-index: 1;
  min-width: 69px;
`;

const BgRobotGarage = styled.img`
  position: absolute;
`;

const BgContainer = styled.div`
  display: contents;
`;

const GarageItemWrapper = styled.div`
  position: relative;
  cursor: context-menu;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h3 {
    position: absolute;
    bottom: 0;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #616d7a;
    height: 12px;
  }
  :hover {
    cursor: pointer;
  }
`;
