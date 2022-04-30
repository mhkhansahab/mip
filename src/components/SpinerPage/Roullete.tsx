import gsap, { Power1 } from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { imageRoute } from "../../utils/api";
import { checkImageSrc, checkTier } from "../../utils/commonFunctions";
import arrWin from "../../assets/img/arrowSpinnerWinItem.png";
import { ModalMultiWinnerSpin } from "../common/Modals/ModalMultiWinnerSpin";
import { ModalWinnerSpin } from "../common/Modals/ModalWinnerSpin";
import borderMarket from "../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../assets/img/modalBGItemSpin.svg";
import { Tier } from "../common/Tier";
import { AdminPartsType } from "../../utils/commonTypes";
///
type RoulletePropsType = {
  winnerId: number[];
  allDetails: AdminPartsType[];
  winArr?: AdminPartsType[];
  spin: boolean;
  freeType: boolean;
};

const itemWidth = 220;

export const Roullete = (props: RoulletePropsType) => {
  const [visibleWinSpin, setVisibleWinSpin] = useState<boolean>(false);
  const [visibleMultiWinSpin, setMultiVisibleWinSpin] =
    useState<boolean>(false);
  const desiredImg = useRef<HTMLImageElement>(null);
  const listsRef = useRef<HTMLDivElement>(null);

  const items = props.allDetails;

  const winItems = items.filter(item => item.id === props.winnerId[0]);

  useEffect(() => {
    desiredImg.current &&
      listsRef.current &&
      props.winnerId &&
      props.spin &&
      rouletteSpin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.winnerId]);

  const rouletteSpin = () => {
    const timeLine = gsap.timeline();
    props.winnerId.forEach((elem, idx, arr) => {
      timeLine.to(listsRef.current, {
        x: -items.findIndex(el => el.id === elem) * itemWidth - itemWidth / 2,
        ease: Power1.easeOut,
        duration: 3,
        onComplete: () => {},
      });
    });
    timeLine.call(() =>
      props.winnerId.length === 1
        ? setVisibleWinSpin(true)
        : setMultiVisibleWinSpin(true),
    );
  };

  return (
    <RoulleteContainer>
      <RoulleteIndicator>
        <img src={arrWin} alt="" />
        <img src={arrWin} alt="" />
      </RoulleteIndicator>
      <RoulleteImagesWrapper>
        <RoulleteImagesList ref={listsRef} id="roulette-images-list">
          {items.map(item => (
            <RoulleteItem key={item.id}>
              <BgRobotModal src={borderMarket} alt="" />
              <CircleIconStyled rarity={checkTier(item.partparams)} />
              {item.id === props.winnerId[0] ? (
                <RoulleteImg
                  ref={desiredImg}
                  src={`${imageRoute}${checkImageSrc(
                    item.images,
                    "Thumbnail_Layer",
                  )}`}
                  alt=""
                />
              ) : (
                <RoulleteImg
                  src={`${imageRoute}${checkImageSrc(
                    item.images,
                    "Thumbnail_Layer",
                  )}`}
                  alt=""
                />
              )}
              <DescrSpinItem>
                {item.name.split("_").slice(-2, -1).join(" ")}
              </DescrSpinItem>
              <NameSpinItem>
                {item.name.split("_").slice(-2).join(" ")}
              </NameSpinItem>
              <Tier tier={checkTier(item.partparams)} />
            </RoulleteItem>
          ))}
        </RoulleteImagesList>
      </RoulleteImagesWrapper>

      {visibleWinSpin && (
        <ModalWinnerSpin
          visible={visibleWinSpin}
          onClose={() => setVisibleWinSpin(false)}
          name={winItems[0].name}
          sell={winItems[0].sell || 0}
          imgSrc={`${imageRoute}${checkImageSrc(
            winItems[0].images,
            "Thumbnail_Layer",
          )}`}
          freeType={props.freeType}
        />
      )}
      {visibleMultiWinSpin && (
        <ModalMultiWinnerSpin
          visible={visibleMultiWinSpin}
          onClose={() => setMultiVisibleWinSpin(false)}
          winItems={props.winArr}
          freeType={props.freeType}
        />
      )}
    </RoulleteContainer>
  );
};

const DescrSpinItem = styled.div`
  position: absolute;
  color: #fff;
  border-radius: 6px;
  padding: 4px 13px;
  bottom: 50px;
  background: #000;
  z-index: 2;
  font-size: 14px;
`;

const NameSpinItem = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  z-index: 1;
  margin-top: 20px;
`;

const CircleIconStyled = styled(CircleIcon)<{
  rarity: string;
}>`
  fill: ${props =>
    props.rarity === "Red"
      ? `red`
      : props.rarity === "Yellow"
      ? `yellow`
      : props.rarity === "Green"
      ? `green`
      : props.rarity === "Blue"
      ? `blue`
      : props.rarity === "Yellow"
      ? `yellow`
      : `#29efa8`};

  position: absolute;
  left: -45px;
  top: -50px;
`;

const BgRobotModal = styled.img`
  position: absolute;
  height: 130px;
  left: 45px;
`;

const RoulleteContainer = styled.div`
  width: 100%;
  height: 305px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const RoulleteImagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const RoulleteImagesList = styled.div`
  position: absolute;
  left: 50%;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  display: flex;
`;

//ЗНАЧЕНИЕ ШИРИНЫ У ЭТОГО ЭЛЕМЕНТА НЕ МЕНЯТЬ. ОТ НЕГО ЗАВИСЯТ РАСЧЕТЫ default-width:220px;
const RoulleteItem = styled.div`
  display: inline;
  width: ${itemWidth}px;
  height: 220px;
  display: flex;
  justify-content: center;
  background: #0b1014;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #fff659;
  position: relative;
  flex-direction: column;
`;

const RoulleteImg = styled.img`
  min-width: 80px;
  margin-top: 1px;
  margin-bottom: 1px;
  z-index: 1;
  margin-top: 25px;
`;

//ИНДИКАТОР - это СТРЕЛКА, которая показывает победителя
const RoulleteIndicator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 47%;
  margin: 0;
  height: 100%;
  background: none;
  z-index: 1;
  > img:last-child {
    transform: rotate(180deg);
  }
`;
