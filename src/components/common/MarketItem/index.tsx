import styled from "styled-components";
import smallDiamond from "../../../assets/img/smallDiamond.svg";
import borderMarket from "../../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/ellipseMarket.svg";
import TedButton from "../Button/TedButton";
import { Tier } from "../Tier";
import Modal from "../Modal";
import { useState } from "react";
import diamond from "../../../assets/img/smallDiamond.svg";
import { useGetBuyDetails } from "../../../hooks/useGetBuyDetails";

type MarketItemPropsType = {
  name: string;
  part: string;
  price: number;
  imgSrc: string;
  tier: string;
  idDetail: number;
  disabled: boolean;
  count: number;
};

const MarketItem = (props: MarketItemPropsType) => {
  const [visAcceptBuyDetail, setVisAcceptBuyDetail] = useState<boolean>(false);

  const { mutate: buyDetail } = useGetBuyDetails();

  const buyDet = (id: number) => {
    buyDetail({ id });
    setVisAcceptBuyDetail(false);
  };

  return (
    <MarketBG>
      <MarketItemWrapper>
        <MarketItemText>
          <RobotMarket src={props.imgSrc} alt="" />
          <BgRobotMarket src={borderMarket} alt="" />
          <CircleIconStyled />
          <h3>{`${props.name.split(" ").slice(1, 3).join(" ")} (${
            props.count
          })`}</h3>
          <p>{props.part}</p>
          <CristalCount>
            <span>{props.price}</span>
            <img src={smallDiamond} alt="" />
          </CristalCount>
          <TedButton
            onclick={() => setVisAcceptBuyDetail(true)}
            active={false}
            size="small"
            color="green"
            width="140"
            disabled={props.disabled}
          >
            Buy now
          </TedButton>
        </MarketItemText>
      </MarketItemWrapper>
      <Tier tier={props.tier} />
      {visAcceptBuyDetail && (
        <Modal
          visible={visAcceptBuyDetail}
          onClose={() => setVisAcceptBuyDetail(false)}
        >
          <ModalContent>
            <h3>Confirm your actions</h3>
            <RobotsWrapper>
              <div>
                Do you really want to buy a part? <br />
                {props.name} <br />
                <Diamonds>
                  <span>for </span> <p>{props.price}</p>
                  <img src={diamond} alt="" />
                </Diamonds>
              </div>
            </RobotsWrapper>
            <ModalButton>
              <AcceptSell onClick={() => buyDet(props.idDetail)}>
                Yes
              </AcceptSell>
              <NotSell onClick={() => setVisAcceptBuyDetail(false)}>No</NotSell>
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </MarketBG>
  );
};

export default MarketItem;

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

const CircleIconStyled = styled(CircleIcon)`
  fill: #29efa8;
  position: absolute;
`;

const RobotMarket = styled.img`
  z-index: 1;
`;

const BgRobotMarket = styled.img`
  position: absolute;
`;

const MarketBG = styled.div`
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  height: 277px;
  width: 226px;
  border-radius: 12px;
  margin: 12px;
  position: relative;
`;

const MarketItemWrapper = styled.div`
  height: 277px;
  width: 226px;
  cursor: context-menu;
  background: linear-gradient(45deg, #1f2933 3%, #151b24 3%);
  border-radius: 12px;
`;

const MarketItemText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
    margin: 4px 0 14px 0;
  }

  > h3 {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }

  > img {
    height: 98px;
    margin: 14px 0 9px 0;
  }

  button {
    margin-top: 24px;
  }
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffd63d;
  }

  > img {
    margin-left: 6px;
  }
`;
