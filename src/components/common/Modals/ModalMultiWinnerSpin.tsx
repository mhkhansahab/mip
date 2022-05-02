import Modal from "../Modal";
import styled from "styled-components";
import borderMarket from "../../../assets/img/borderMarketItem.svg";
import { ReactComponent as CircleIcon } from "../../../assets/img/modalBGItemSpin.svg";
// import { ReactComponent as ArrowRight } from "../../../assets/img/bonusesArrow.svg";
import Slider from "react-slick";
import { AdminPartsType } from "../../../utils/commonTypes";
import { imageRoute } from "../../../utils/api";
import { checkImageSrc, checkTier } from "../../../utils/commonFunctions";
// import { useHistory } from "react-router-dom";
import {
  SlickArrowLeftProfile,
  SlickArrowRightProfile,
} from "../SlickArrow/SlickArrow";

type PropsTypeWinSpin = {
  visible: boolean;
  onClose: () => void;
  winItems?: AdminPartsType[];
  freeType: boolean;
};

export default function ModalMultiWinnerSpin({
  winItems,
  visible,
  onClose,
  freeType,
}: PropsTypeWinSpin) {
  // const history = useHistory();

  const settings = {
    infinite: false,
    speed: 400,
    slidesToScroll: 1,
    slidesToShow: 1,
  };

  // const closeModal = () => {
  //   onClose();
  //   freeType && history.push("/loot");
  // };

  const afterChangeHandler = (currentslide: number) => {
    //setActiveElForSeil(winItems[currentSlide]);
  };
  return (
    <Modal visible={visible} onClose={() => onClose()}>
      <Slider
        {...settings}
        nextArrow={<SlickArrowRightProfile />}
        prevArrow={<SlickArrowLeftProfile />}
        afterChange={afterChangeHandler}
      >
        {winItems?.length &&
          winItems?.map(item => (
            <ItemModal key={item.id}>
              <BgRobotModal src={borderMarket} alt="" />
              <CircleIconStyled />
              <RobotModal
                src={`${imageRoute}${checkImageSrc(
                  item.images,
                  "Thumbnail_Layer",
                )}`}
                alt=""
              />
              <TextModal>
                <h3>{item.name.split("_").slice(-2, -1).join("")}</h3>
                <p>{checkTier(item.partparams)}</p>
              </TextModal>
            </ItemModal>
          ))}
      </Slider>
      {/* <ModalContent>
        <h3>Congratulations!</h3>
        <img src={lootItemBorderImg} alt="" />
        <SliderWrapper>
          <CarouselProvider
            naturalSlideWidth={894}
            naturalSlideHeight={226}
            totalSlides={winItems?.length || 1}
            currentSlide={1}
          >
            <Slider>
              {winItems?.length &&
                winItems?.map(item => (
                  <Slide index={item.id} key={item.id}>
                    <ItemModal>
                      <BgRobotModal src={borderMarket} alt="" />
                      <CircleIconStyled />
                      <RobotModal
                        src={`${imageRoute}${checkImageSrc(
                          item.images,
                          "Thumbnail_Layer",
                        )}`}
                        alt=""
                      />
                      <TextModal>
                        <h3>{item.name.split("_").slice(-2, -1).join("")}</h3>
                        <p>{checkTier(item.partparams)}</p>
                      </TextModal>
                    </ItemModal>
                  </Slide>
                ))}
            </Slider>
            <BtnWrapp>
              <ButtonBack>
                <BtnBack />
              </ButtonBack>
              <ButtonNext>
                <BtnPrev />
              </ButtonNext>
            </BtnWrapp>
          </CarouselProvider>
        </SliderWrapper>
        <ModalButton>
          <TedButton
            size="medium"
            width="160"
            color="green"
            onclick={() => closeModal()}
          >
            Fine
          </TedButton>
        </ModalButton>
      </ModalContent> */}
    </Modal>
  );
}

// const BtnBack = styled(ArrowRight)`
//   fill: #fff;
// `;

// const BtnPrev = styled(ArrowRight)`
//   fill: #fff;
// `;

// const SliderWrapper = styled.div`
//   position: relative;
//   display: flex;
//   width: 455px;
//   height: 408px;
//   border-radius: 12px;
//   background: #0e141a;
//   padding: 17px;
//   overflow: hidden;

//   > div {
//     display: flex;
//     justify-content: center;
//     > div {
//       position: relative;
//       :last-child {
//         z-index: 3;
//         position: absolute;
//         top: 0;
//         left: 42px;
//         width: 400px;
//         height: 100%;
//       }
//       > div {
//         > div {
//           display: flex;
//           width: 100% !important;
//         }
//       }
//     }
//   }
// `;

// const BtnWrapp = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   > button {
//     background: none;
//     border: none;
//     width: 70px;
//     height: 50%;
//     :hover {
//       cursor: pointer;
//     }
//   }
//   > button:first-child {
//     transform: matrix(-1, 0, 0, 1, 0, 0);
//   }
// `;

// const ModalButton = styled.div`
//   display: flex;
//   margin-bottom: 23px;

//   > div {
//     margin: 0 6px;
//   }
// `;

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
  margin: 34px 138px 0px;
  width: 183px;
  height: 243px;
  position: relative;
  display: flex;
  color: #ffffff;
  flex-direction: column;

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

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow: hidden;
//   width: 408px;
//   height: 455px;
//   background: linear-gradient(45deg, #1f2933 3%, #0e141a 3%);
//   border-radius: 12px;
//   color: #ffffff;
//   text-align: center;

//   > h3 {
//     font-size: 24px;
//     line-height: 29px;
//     text-align: center;
//     margin-top: 32px;
//   }

//   > img {
//     margin-top: 12px;
//   }
// `;
