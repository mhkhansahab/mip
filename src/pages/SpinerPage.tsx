import styled from "styled-components";
import loadable from '@loadable/component';
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as Star } from "../assets/img/starSpinnerBG.svg";
import lootHeaderBg from "../assets/img/backgroundSpinner.png";
import backspinner from "../assets/img/backSpinner.svg";
import arrow from "../assets/img/arrowBackSpinner.svg";
import smallDiamond from "../assets/img/smallDiamond.svg";
import { checkImageSrc, checkTier } from "../utils/commonFunctions";
import { ProfileUserSpins } from "../utils/commonTypes";
import { imageRoute } from "../utils/api";
import { useAdminGetOneBoxLoot } from "../hooks/useAdminGetOneBoxLoot";
import { usePostSpinLootBox } from "../hooks/usePostSpinLootBox";

const CustomLoader = loadable(() => import('../components/common/Loader'));
const TedButton = loadable(() => import('../components/common/Button/TedButton'))
const MultiBtn = loadable(() => import('../components/common/Button/MultiBtn'));
const SpinnerItem = loadable(() => import('../components/common/SpinnerItem'));
const Roullete = loadable(() => import('../components/Roulette'));
const ModalWinnerSpin = loadable(() => import('../components/common/Modals/ModalWinnerSpin'));
const ModalMultiWinnerSpin = loadable(() => import('../components/common/Modals/ModalMultiWinnerSpin'));

type SpinerPropsType = {
  balance: number;
  spins: ProfileUserSpins[];
};

const Spiner = (props: SpinerPropsType) => {
  const params = useParams<{ pageNumber: string }>();
  const history = useHistory();

  const { mutate: startSpin, data: winSpinData } = usePostSpinLootBox();

  const [winnerId, setWinnerId] = useState<number[]>([]);

  useEffect(() => {
    winSpinData?.data && setWinnerId(winSpinData?.data.winIdArray);
  }, [winSpinData]);

  const { data: oneCaseData, isLoading } = useAdminGetOneBoxLoot(
    +params.pageNumber,
  );

  useEffect(() => {
    !!props.spins.filter(item => item.lootboxId === +params.pageNumber)
      .length ||
      !oneCaseData?.data.type ||
      history.push("/loot");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneCaseData?.data.type]);

  let money = oneCaseData?.data.price || 0;

  const detailsLootBox = oneCaseData?.data.parts || [];

  const [activMultiSpin, setActivMultiSpin] = useState<number>(1);

  const freeArr = ["free", "A", "B", "C", "D"];

  const multiSpinMap = freeArr.includes(oneCaseData?.data.type || "")
    ? []
    : [
        { id: 1, name: "x1" },
        { id: 2, name: "x2" },
        { id: 3, name: "x3" },
        { id: 5, name: "x5" },
        { id: 7, name: "x7" },
      ];

  const clickSpin = (checkFast: boolean) => {
    setIsSpin(checkFast);

    startSpin({
      countRaffle: activMultiSpin,
      lootboxId: +params.pageNumber,
    });
  };

  const checkMoney = (id: number) => {
    if (props.balance >= (money || 0) * id) {
      return false;
    } else {
      return true;
    }
  };

  const [isSpin, setIsSpin] = useState<boolean>(false);

  const [visibleWinSpin, setVisibleWinSpin] = useState<boolean>(false);
  const [visibleMultiWinSpin, setMultiVisibleWinSpin] =
    useState<boolean>(false);

  const winItems = detailsLootBox?.filter(item =>
    winnerId.length ? item.id === winnerId[0] : item.id === 0,
  );

  const fastSpin = () => {
    clickSpin(false);

    winnerId.length === 1
      ? setVisibleWinSpin(true)
      : setMultiVisibleWinSpin(true);
  };

  useEffect(() => {
    setIsSpin(isSpin);
  }, [isSpin, winSpinData]);

  return (
    <>
      <SpinerContainer>
        <TwistSpiner>
          <StarSpinner />
          <Spinner>
            {isLoading ? (
              <CustomLoader margin="100px 0" />
            ) : (
              <Roullete
                winnerId={winnerId}
                allDetails={detailsLootBox}
                winArr={winSpinData?.data.winData}
                spin={isSpin}
                freeType={freeArr.includes(oneCaseData?.data.type || "")}
              />
            )}
          </Spinner>
          <BackSpinner onClick={() => history.push("/loot")}>
            <img src={arrow} alt="" />
            <img className="imgMiddle" src={backspinner} alt="" />
            <p>Case {params.pageNumber}</p>
          </BackSpinner>

          <ButtonGroup>
            <BigBtn>
              <TedButton
                size="big"
                width="250"
                color="yellow"
                onclick={() => clickSpin(true)}
                disabled={
                  props.balance < (money || 0) || detailsLootBox.length === 0
                }
              >
                TWIST NOW
              </TedButton>
              <TedButton
                size="big"
                width="250"
                color="blue"
                onclick={() => fastSpin()}
                disabled={
                  props.balance < (money || 0) || detailsLootBox.length === 0
                }
              >
                OPEN QUICKLY
              </TedButton>
            </BigBtn>
            <SmallBtn>
              {multiSpinMap.map(item => (
                <div onClick={() => setActivMultiSpin(item.id)} key={item.id}>
                  <MultiBtn
                    active={activMultiSpin === item.id}
                    disabled={
                      checkMoney(item.id) || detailsLootBox.length === 0
                    }
                  >
                    {item.name}
                  </MultiBtn>
                </div>
              ))}
            </SmallBtn>
            <CristalCount>
              <span>{(money || 0) * activMultiSpin} </span>
              <img src={smallDiamond} alt="" />
            </CristalCount>
          </ButtonGroup>
        </TwistSpiner>
        <ItemSpinner>
          {isLoading ? (
            <CustomLoader margin="100px 0" />
          ) : (
            <SpinnerItems>
              {detailsLootBox.map(item => (
                <SpinnerItem
                  key={item.id}
                  name={item.name}
                  src={item.partparams[0].value}
                  tier={checkTier(item.partparams)}
                  type={item.type}
                  typeDetails={item.name.split("_").slice(-2, -1).join("")}
                  imgSrc={`${imageRoute}${checkImageSrc(
                    item.images,
                    "Thumbnail_Layer",
                  )}`}
                />
              ))}
            </SpinnerItems>
          )}
        </ItemSpinner>
        {visibleWinSpin && winSpinData?.data && (
          <ModalWinnerSpin
            visible={visibleWinSpin}
            onClose={() => setVisibleWinSpin(false)}
            name={winItems[0].name}
            sell={winItems[0].sell || 0}
            imgSrc={`${imageRoute}${checkImageSrc(
              winItems[0].images,
              "Thumbnail_Layer",
            )}`}
            freeType={freeArr.includes(oneCaseData?.data.type || "")}
          />
        )}
        {visibleMultiWinSpin && winSpinData?.data && (
          <ModalMultiWinnerSpin
            visible={visibleMultiWinSpin}
            onClose={() => setMultiVisibleWinSpin(false)}
            winItems={winSpinData?.data.winData}
            freeType={freeArr.includes(oneCaseData?.data.type || "")}
          />
        )}
      </SpinerContainer>
    </>
  );
};

export default Spiner;

const SpinnerItems = styled.div`
  margin: 20px 0 0 30px;
  display: flex;
  flex-wrap: wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const BigBtn = styled.div`
  width: 526px;
  display: flex;
  align-self: center;
`;

const SmallBtn = styled.div`
  display: flex;
  align-self: center;
  margin: 20px 0 18px 0;

  button {
    margin: 0 4px;
    :hover {
      cursor: pointer;
    }
  }
`;

const CristalCount = styled.div`
  align-self: center;

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

const BackSpinner = styled.div`
  display: flex;
  position: absolute;
  top: 48px;
  left: 48px;
  align-items: center;
  cursor: pointer;

  p {
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  .imgMiddle {
    margin: 0 6px 0 20px;
  }
`;

const Spinner = styled.div`
  z-index: 1;
  height: 450px;
  display: flex;
  align-items: center;
`;

const StarSpinner = styled(Star)`
  position: absolute;
  z-index: 0;

  top: 45px;
  left: 350px;
  @media (max-width: 1440px) {
    left: 203px;
  }
  @media (max-width: 1366px) {
    top: -16px;
    left: 160px;
  }
`;

const SpinerContainer = styled.div``;

const TwistSpiner = styled.div`
  background-image: url(${lootHeaderBg});
  height: 700px;
  position: relative;
`;

const ItemSpinner = styled.div``;
