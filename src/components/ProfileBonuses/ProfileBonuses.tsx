import styled from "styled-components";
import photo from "../../assets/img/photo.png";
import bgNoActive from "../../assets/img/bonusesBGNoActive.svg";
import bgActive from "../../assets/img/bonusesBGActive.svg";
import diamond from "../../assets/img/smallDiamond.svg";
import { ReactComponent as ArrowRight } from "../../assets/img/bonusesArrow.svg";
import robotPass from "../../assets/img/bonusesRobotPass.png";
import { ReactComponent as LogoutIcon } from "../../assets/img/logout.svg";
import { ReactComponent as BorderTop } from "../../assets/img/bonusesBorderTop.svg";
import { ReactComponent as BorderBottom } from "../../assets/img/BonusesBorderBottom.svg";
import { ReactComponent as BonusSetting } from "../../assets/img/bonusSettings.svg";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Bonus from "../common/Bonus";
import TedButton from "../common/Button/TedButton";
import BonusesHorizontItem from "../common/BonusesHorizontItem";
import BonusesVerticalItem from "../common/BonusesVerticalItem";
import BonusesNews from "../common/BonusesNews";
import { bonusMap, ProfileUserInfo } from "../../utils/commonTypes";
import { bonusesNewsMap } from "../../utils/commonTypes";
import { verticalItemsMap } from "../../utils/commonTypes";
import Slider from "react-slick";
import { useGetHistoryUsers } from "../../hooks/useGetHistoryUsers";
import { checkImageSrc } from "../../utils/commonFunctions";
import CustomLoader from "../common/Loader";
import {
  SlickArrowLeftProfile,
  SlickArrowRightProfile,
} from "../common/SlickArrow/SlickArrow";
// DELETE CarouselProvider

type ProfileBonusesPropsType = {
  isOpen: () => void;
  profile: ProfileUserInfo;
};

const garageTabs = [
  {
    id: 1,
    name: "Your balance",
  },
  {
    id: 2,
    name: "Your robots",
  },
];

export const ProfileBonuses = (props: ProfileBonusesPropsType) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.go(0);
  };

  const [activeTab, setActiveTab] = useState<string>("Your balance");

  const handleActiveTab = (name: string) => {
    setActiveTab(name);
  };

  const afterChangeHandler = (currentslide: number) => {
    //setActiveElForSeil(winItems[currentSlide]);
  };

  const { data: historyUser, isLoading: loadingHistory } = useGetHistoryUsers();

  const settings = {
    infinite: false,
    speed: 400,
    slidesToScroll: 1,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <ProfileBonusesContainer>
      <LeftProfile>
        <CabinetWrapper>
          <FullCabinetInfo>
            <Image src={photo} />
            <MiddleCabinetInfo>
              <ProfileName>User</ProfileName>
              <Wallet>
                {props.profile.wallet
                  ? `${props.profile.wallet.split("").slice(0, 10).join("")}...`
                  : "No wallet"}
              </Wallet>
              <DiamondsWrapper>
                <Diamonds>
                  <Mips>
                    <img src={diamond} alt="" />
                    <span>{props.profile.balance} MIP</span>
                  </Mips>
                  <p>Balance</p>
                </Diamonds>

                <DiamondsBonus>
                  <Mips>
                    <span>+ 280 MIP</span>
                    <img src={diamond} alt="" />
                  </Mips>
                  <p>Dayly bonus</p>
                </DiamondsBonus>
              </DiamondsWrapper>
            </MiddleCabinetInfo>
            <SettingsIcon>
              <LogoutIconStyled onClick={handleLogout} />
              <SettingIconStyled onClick={() => props.isOpen()} />
            </SettingsIcon>
            <BonusTabWrapper>
              {garageTabs.map(tab => (
                <BonusTab
                  key={`${tab.id}}`}
                  active={tab.name === activeTab}
                  onClick={() => handleActiveTab(tab.name)}
                >
                  {tab.name}
                </BonusTab>
              ))}
            </BonusTabWrapper>
          </FullCabinetInfo>

          <MipBonuses></MipBonuses>
        </CabinetWrapper>
        {activeTab === "Your balance" && bonusMap.length !== 0 && (
          <BonusesWrapper>
            {bonusMap.map(item => (
              <Bonus
                key={`${item.id}`}
                currentProg={item.currentProg}
                descrBonus={item.descrBonus}
                nameBonus={item.nameBonus}
                needProg={item.needProg}
                rewardCoin={item.rewardCoin}
              />
            ))}
          </BonusesWrapper>
        )}
        {activeTab === "Your balance" && bonusMap.length === 0 && (
          <NotItemsText>
            <div>
              So far, you have no bonuses. Upgrade your robots to get them
            </div>
          </NotItemsText>
        )}

        {activeTab === "Your robots" && (
          <RobotWrapper>
            {props.profile.robots
              .filter(robot => robot.status !== "NFT")
              .map(robot => (
                <RobotItemActive key={robot.id}>
                  <ImgWrapper>
                    <img src={robotPass} alt="" />
                  </ImgWrapper>

                  <AboutPass>
                    <h3>Head of Thrones</h3>
                    <p>Lorem lorem lorem lorem</p>
                    <PassProgress>90/100 XP</PassProgress>
                  </AboutPass>
                  <Arrow />

                  <BorderTp />
                  <BorderBot />
                </RobotItemActive>
              ))}

            {props.profile.season_pass && (
              <RobotItemNoActive>
                <BorderTp />
                <BorderBot />
                <BuyNow>
                  <p>None</p>
                  <TedButton
                    size="small"
                    width="140"
                    color="green"
                    onclick={() => history.push("/seasonpass")}
                  >
                    Buy now
                  </TedButton>
                </BuyNow>
              </RobotItemNoActive>
            )}
          </RobotWrapper>
        )}
      </LeftProfile>

      <MiddleContent>
        <HorizontItems>
          {loadingHistory ? (
            <CustomLoader margin="50px" />
          ) : (
            <SliderWrapp
              {...settings}
              nextArrow={<SlickArrowRightProfile />}
              prevArrow={<SlickArrowLeftProfile />}
              afterChange={afterChangeHandler}
            >
              {!!historyUser?.data &&
                historyUser.data.map(item => (
                  <BonusesHorizontItem
                    key={item.id}
                    name={item.part.name.split("_").slice(0, 2).join(" ")}
                    descr={item.part.trait_type}
                    coin={item.part.price || 0}
                    status={item.type_transfer}
                    src={checkImageSrc(item.part.images, "Thumbnail_Layer")}
                  />
                ))}
            </SliderWrapp>
          )}

          {historyUser?.data.length === 0 && (
            <NotItemsText>
              <div>
                So far, you have no bonuses. Upgrade your robots to get them
              </div>
            </NotItemsText>
          )}
        </HorizontItems>
        <VerticalItems>
          {verticalItemsMap.length !== 0 &&
            verticalItemsMap.map(item => (
              <BonusesVerticalItem
                key={`${item.robotName}${Math.random()}`}
                addCoin={item.addCoin}
                robotName={item.robotName}
                robotDescr={item.robotDescr}
                caseName={item.caseName}
                caseCoin={item.caseCoin}
              />
            ))}

          {verticalItemsMap.length === 0 && (
            <NotItemsText>
              <div>
                So far, you have no bonuses. Upgrade your robots to get them
                <TedButton
                  color="green"
                  onclick={() => {}}
                  size="small"
                  width="140"
                >
                  Loot
                </TedButton>
              </div>
            </NotItemsText>
          )}
        </VerticalItems>
      </MiddleContent>

      <RightNews>
        <NewsContainer>
          <h1>Last News</h1>
          <h2>News</h2>
          {bonusesNewsMap.map(item => (
            <BonusesNews
              key={`${item.title}${Math.random()}`}
              title={item.title}
              type={item.type}
              text={item.text}
            />
          ))}
        </NewsContainer>
      </RightNews>
    </ProfileBonusesContainer>
  );
};

const SliderWrapp = styled(Slider)`
  display: flex;
  width: 860px;
  margin-left: 20px;
  @media (max-width: 1440px) {
    width: 680px;
  }
`;

const NotItemsText = styled.div`
  color: #616d7a;
  font-size: 14px;
  line-height: 17px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
  > div {
    width: 204px;
    > div {
      margin-top: 20px;
    }
  }
`;

const NewsContainer = styled.div`
  > h1 {
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
    @media (max-width: 1366px) {
      display: none;
    }
  }
  > h2 {
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
    display: none;
    @media (max-width: 1366px) {
      display: block;
    }
  }
`;

const RightNews = styled.div`
  padding: 32px 20px 0 20px;
  background: #0e141a;
  width: 465px;
  @media (max-width: 1366px) {
    width: 91px;
  }
`;

const MiddleContent = styled.div`
  padding: 20px;
`;

const HorizontItems = styled.div`
  display: flex;
  width: 890px;
  height: 210px;
  border-radius: 12px;
  background: #0e141a;

  .slick-next {
    right: 20px;
    z-index: 1;
    @media (max-width: 1280px) {
      right: 75px;
    }
  }

  .slick-prev {
    left: 4px;
    z-index: 1;
  }

  @media (max-width: 1440px) {
    width: 687px;
    > div {
      margin-left: 10px;
    }
  }
  @media (max-width: 1280px) {
    width: 637px;
  }
`;

const VerticalItems = styled.div`
  padding: 17px;
  width: 860px;
  height: 730px;
  border-radius: 12px;
  background: #0e141a;
  margin: 20px 0;
  overflow: auto;

  @media (max-width: 1440px) {
    width: 653px;
  }

  @media (max-width: 1280px) {
    width: 603px;
  }

  > div:nth-child(2n) {
    background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
    border-radius: 12px;
  }
`;

const BuyNow = styled.div`
  margin: 0 auto;
  > p {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #616d7a;
    margin-bottom: 19px;
  }
`;

const PassProgress = styled.div`
  margin-top: 50px;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  @media (max-width: 1440px) {
    margin-top: 20px;
  }
`;

const Arrow = styled(ArrowRight)`
  margin-right: 20px;
  fill: #fff;
`;

const AboutPass = styled.div`
  width: 159px;
  height: 102px;
  margin-left: -50px;

  > h3 {
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }
  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
    margin-top: 4px;
  }
`;

const ImgWrapper = styled.div``;

const BorderTp = styled(BorderTop)`
  right: 0;
  top: 0;
  position: absolute;
`;

const BorderBot = styled(BorderBottom)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const RobotItemActive = styled.div`
  background-image: url(${bgActive});
`;

const RobotItemNoActive = styled.div`
  background-image: url(${bgNoActive});
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background-position: center;
`;

const RobotWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 465px;
  height: 564px;
  flex-direction: column;
  margin-bottom: 20px;
  overflow-x: auto;

  @media (max-width: 1440px) {
    width: 391px;
  }

  > div {
    border-radius: 12px;
    width: 425px;
    height: 166px;
    margin-top: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    @media (max-width: 1440px) {
      width: 368px;
    }
  }
`;

const BonusesWrapper = styled.div`
  margin: 20px 0;

  > div {
    border-radius: 12px;
    margin: 0 20px 8px 20px;
    width: 388px;
    @media (max-width: 1440px) {
      width: 317px;
    }
  }
`;

const BonusTabWrapper = styled.div`
  display: flex;
  margin-top: 32px;
`;

const BonusTab = styled.div<{ active: boolean }>`
  border-radius: 12px 12px 0px 0px;
  width: 200px;
  height: 50px;
  align-items: end;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 17px;
  @media (max-width: 1440px) {
    width: 175px;
  }

  ${props =>
    props.active
      ? `background: #0a0b0d; color: #ffffff`
      : `background: none; color: #616D7A`};

  :hover {
    cursor: pointer;
  }
`;

const Mips = styled.div`
  > img {
    margin-bottom: -3px;
  }
`;

const ProfileName = styled.div`
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`;

const MipBonuses = styled.div``;

const SettingsIcon = styled.div`
  position: absolute;
  right: 0;
`;

const CabinetWrapper = styled.div`
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  display: flex;
  align-items: center;
`;

const FullCabinetInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 0 20px;
  text-align: center;
  position: relative;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
`;

const Image = styled.img`
  margin: 16px 0 8px 0;
  height: 130px;

  @media (max-width: 1440px) {
    height: 105px;
  }
`;

const MiddleCabinetInfo = styled.div``;

const Wallet = styled.p`
  font-size: 16px;
  line-height: 19px;
  line-height: 19px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const DiamondsWrapper = styled.div`
  display: flex;
  margin-top: 28px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 206px;
    height: 98px;
    background: #0b1014;
    border-radius: 12px;
    flex-direction: column;
    @media (max-width: 1440px) {
      width: 170px;
      height: 90px;
    }

    > p {
      margin-top: 8px;
      font-size: 14px;
      line-height: 17px;
      color: #616d7a;
    }
  }
`;

const DiamondsBonus = styled.div`
  > div {
    > span {
      font-size: 20px;
      line-height: 24px;
      color: #ffd63d;
      margin: 0 7px;
    }
  }
`;

const Diamonds = styled.div`
  margin-right: 12px;

  > div {
    > span {
      font-size: 20px;
      line-height: 24px;
      color: #ffd63d;
      margin-left: 6px;
    }
  }
`;

const SettingIconStyled = styled(BonusSetting)`
  height: 32px;
  fill: #283542;
  cursor: pointer;
  margin: 0 20px 0 17px;

  :hover {
    fill: #fff;
  }
`;

const LogoutIconStyled = styled(LogoutIcon)`
  height: 32px;
  fill: #283542;
  cursor: pointer;

  :hover {
    fill: #fff;
  }
`;

const ProfileBonusesContainer = styled.div`
  display: flex;
`;

const LeftProfile = styled.div`
  width: 465px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1440px) {
    width: 390px;
  }
`;
