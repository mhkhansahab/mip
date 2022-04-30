import styled from "styled-components";
import { ReactComponent as iconSea } from "../assets/img/landingOpenSea.svg";
import { ReactComponent as iconTwitter } from "../assets/img/landingTwitter.svg";
import { ReactComponent as iconDiscord } from "../assets/img/landingDiscord.svg";
import { ReactComponent as iconHome } from "../assets/img/landingHome.svg";
import { ReactComponent as iconGarage } from "../assets/img/landingGarage.svg";
import { ReactComponent as iconAbout } from "../assets/img/landingAbout.svg";
import { ReactComponent as BorderItems } from "../assets/img/landingBorderItem.svg";
import mainLogo from "../assets/img/landingMainLogo.png";
import menuBG from "../assets/img/landingMenuBG.png";
import { TedButton } from "../components/common/Button/TedButton";
import { TimerLanding } from "../components/common/TimerLanding/TimerLanding";
import { LandingItem } from "../components/LandingItem";
import { Dispatch, SetStateAction, useState } from "react";
import { MetaMaskAuth } from "../components/MetaMaskAuth";
import { Modal } from "../components/common/Modal";
import { LandingItemGallery } from "../components/LandingItemGallery";
import { ReactComponent as galleryArrowLeft } from "../assets/img/LandingArrowGallery.svg";
import { ReactComponent as galleryArrowRight } from "../assets/img/LandingArrowGallery.svg";
import aboutLeftRobot from "../assets/img/landingPhaseLeftImg.png";
import platformBG from "../assets/img/landingPlatformBG.png";
import platformBGLoot from "../assets/img/landingPlatformBGEffect.svg";
import aboutRightGirl from "../assets/img/landingPhaseRightImg.png";
import platformLootPage from "../assets/img/landingPlatformLootPageImg.png";
import productLeftImg from "../assets/img/landingProductLeftImg.png";
import productRightImg from "../assets/img/landingProductRightImg.png";
import productBGImg from "../assets/img/landingProductBG.png";
import { ReactComponent as ProductBGLeftEffect } from "../assets/img/landingProductBGLeftEffect.svg";
import { ReactComponent as ProductBGRightEffect } from "../assets/img/landingProductBGRihtEffect.svg";
import { ReactComponent as aboutEffectRobot } from "../assets/img/landingPhaseEffect.svg";
import { ReactComponent as StarPassBG } from "../assets/img/starSpinnerBG.svg";
import { ReactComponent as EffectPassBG } from "../assets/img/ellipseMarket.svg";
import passImg from "../assets/img/landingPassImg.png";
import premIconPass from "../assets/img/premPassIconTittle.png";
import premBGPass from "../assets/img/premPassBGTittle.png";
import freeBGPass from "../assets/img/freePassBGTittle.png";
import freeIconPass from "../assets/img/freePassIconTittle.svg";
import passMainBG from "../assets/img/landingPassMainBG.png";
import { FreeKart } from "../components/Pass/FreeKart";
import { PremiumKart } from "../components/Pass/PremiumKart";
import mainPetBG from "../assets/img/landingPetsPassBGImg.png";
import petImgLT from "../assets/img/petsImgLT.png";
import petImgLB from "../assets/img/petsImgLB.png";
import petImgRT from "../assets/img/petsImgRT.png";
import petImgRB from "../assets/img/petsImgRB.png";
import roadMap1 from "../assets/img/landingRoadMapImg1.png";
import roadMap2 from "../assets/img/landingRoadMapImg2.png";
import roadMap3 from "../assets/img/landingRoadMapImg3.png";
import roadMap4 from "../assets/img/landingRoadMapImg4.png";
import roadMap5 from "../assets/img/landingRoadMapImg5.png";
import roadMap6 from "../assets/img/landingRoadMapImg6.png";
import factionBG from "../assets/img/landingFactionsBG.png";
import { ReactComponent as RoadMapDoth } from "../assets/img/landingDothItem.svg";
import factionImgL from "../assets/img/landingFactionImg2.png";
import factionImgC from "../assets/img/landingFactionImg1.png";
import factionImgR from "../assets/img/landingFactionImg3.png";
import footerLogo from "../assets/img/landingFooterImg.png";
import passport from "../assets/img/passport.png";
import accept from "../assets/img/correct.png";

type LandingProps = {
  setAuth: Dispatch<SetStateAction<boolean>>;
};

const Landing = (props: LandingProps) => {
  const [isMetaOpen, setIsMetaOpen] = useState<boolean>(false);
  const [modalMenuVisible, setModalMenuVisible] = useState<boolean>(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 10000);

  const modalOpenClose = () => {
    setModalMenuVisible(!modalMenuVisible);
  };

  return (
    <LandingPage>
      {isMetaOpen && (
        <Modal
          center={true}
          visible={isMetaOpen}
          onClose={() => setIsMetaOpen(false)}
        >
          <MetaMaskAuth setAuth={props.setAuth} />
        </Modal>
      )}
      <MenuWrapper>
        <MobileWrapper>
          <MobileMenu>
            <TedButton
              width="160"
              size="small"
              onclick={() => setIsMetaOpen(true)}
              color="green"
            >
              Connect Wallet
            </TedButton>
            <Humburger onClick={() => modalOpenClose()}>
              <div></div>
              <div></div>
              <div></div>
            </Humburger>
            <BorderTopLeft />
            <BorderBotLeft />
            <BorderTopRight />
            <BorderBotRight />
          </MobileMenu>
          {modalMenuVisible && (
            <MenuModalMobile>
              <MenuMobileItem>opensea</MenuMobileItem>
              <MenuMobileItem>twitter</MenuMobileItem>
              <MenuMobileItem>discord</MenuMobileItem>
              <MenuMobileItem>home</MenuMobileItem>
              <MenuMobileItem>garage</MenuMobileItem>
              <MenuMobileItem>about</MenuMobileItem>
            </MenuModalMobile>
          )}
        </MobileWrapper>
        <MenuContainer>
          <LeftMenu>
            <BorderTopLeft />
            <BorderBotLeft />
            <IconItem>
              <IconOpenSea />
              opensea
            </IconItem>
            <IconItem>
              <IconTwitter />
              twitter
            </IconItem>
            <IconItem>
              <IconDiscord />
              discord
            </IconItem>
          </LeftMenu>

          <RightMenu>
            <BorderTopRight />
            <BorderBotRight />
            <IconItem>
              <IconHome />
              home
            </IconItem>
            <IconItem>
              <IconGarage />
              garage
            </IconItem>
            <IconItem>
              <IconAbout />
              about
            </IconItem>

            <TedButton
              width="176"
              color="green"
              onclick={() => setIsMetaOpen(true)}
              size="medium"
            >
              CONNECT WALLET
            </TedButton>
          </RightMenu>
        </MenuContainer>

        <HeaderContent>
          <img src={mainLogo} alt="" />

          <TextPass>
            <div>
              <Passport src={passport} alt="" />
            </div>
            <LeftText>
              <h4>MINT</h4>
              <div>
                <h2>MIP PASSPORT</h2>
              </div>

              <div>
                <img src={accept} alt="" />
                <p>Limited to 1 mint per wallet address Independent</p>
              </div>
              <div>
                <img src={accept} alt="" />
                <p>Ut enim ad minim veniam, quis nostrud exercitation</p>
              </div>
              <div>
                <img src={accept} alt="" />
                <p>Сonsectetur adipiscing elit, sed do eiusmod</p>
              </div>
              <div>
                <img src={accept} alt="" />
                <p>Excepteur sint occaecat cupidatat non proident</p>
              </div>
              <div>
                <img src={accept} alt="" />
                <p>
                  Sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
              </div>
              <ButtonWrapper>
                <TedButton
                  color="blue"
                  onclick={() => { }}
                  size="big"
                  width="192"
                  children="READ MORE"
                  active={true}
                />
                <TedButton
                  color="yellow"
                  onclick={() => { }}
                  size="big"
                  width="192"
                  children="ACTIVATE TICKET"
                  active={true}
                />
                <GrayButton>
                  <div>
                    <p>33 </p>
                    <span> / 100</span>
                  </div>
                </GrayButton>
              </ButtonWrapper>
            </LeftText>
          </TextPass>
          <ItemsPass>
            <LandingItem type={"body"} />
            <LandingItem type={"pass"} />
            <LandingItem type={"pet"} />
          </ItemsPass>
        </HeaderContent>
      </MenuWrapper>

      <GalleryWrapper>
        <LandingItemGallery />
        <LandingItemGallery />
        <LandingItemGallery activeGallery={true} />
        <LandingItemGallery />
        <LandingItemGallery />
        <ArrowGalleryWrapper>
          <GalleryLeft />
          <GalleryRight />
        </ArrowGalleryWrapper>
      </GalleryWrapper>

      <AboutWrapper>
        <AboutTitle>
          <h4>what are mips?</h4>
          <h2>about mips</h2>
        </AboutTitle>
        <AboutContent>
          <PhaseLeft>
            <img src={aboutLeftRobot} alt="" />
            <AboutPhaseTextImg>
              <h1>phase 1 + 2</h1>
            </AboutPhaseTextImg>
          </PhaseLeft>
          <AboutText>
            <p>
              The Mech Identity Protocol project is a new form of dynamic NFT
              collection which will be deployed in multiple phases, starting
              with 10,000 Modular Mech Heads and their drivers. Mech Bodies will
              be releasing later down the line so you can combine and assemble
              your own fully customized Mech. We've always been fascinated{" "}
              <br />
              by the Mech world and the possibilities of producing an NFT
              collection, it's definitely an amazing opportunity for artists and
              innovative people to showcase their craft and for them to show
              their concept of Mech Artwork. The MIP Project was conceptualized
              around the idea of providing YOU the opportunity to swap around
              parts of your Mech, allowing you to express your creative freedom
              or achieve FACTION compositions to increase their rarity.
            </p>
          </AboutText>
          <PhaseRight>
            <img src={aboutRightGirl} alt="" />
            <AboutPhaseTextImg>
              <h6>phase 3</h6>
            </AboutPhaseTextImg>
          </PhaseRight>
          <AboutLeftRobotEffect />
        </AboutContent>
      </AboutWrapper>

      <PlatformWrapper>
        <PlatformText>
          <h4>MEDIA</h4>
          <h2>our platform</h2>
          <p>
            The Mech Identity Protocol project is a new form of dynamic NFT
            collection which will be deployed in multiple phases, starting with
            10,000 Modular Mech Heads and their drivers. Mech Bodies will be
            releasing later down the line so you can combine and assemble your
            own fully customized Mech.
          </p>
        </PlatformText>

        <PlatformLootPageWrapper>
          <PlatformLootTabs>
            <div>GARAGE</div>
            <div>MARKET</div>
            <div>SPINNER</div>
            <div>SEASONPASS</div>
          </PlatformLootTabs>
          <PlatformLootPageWrapp>
            <PlatformLootPage>
              <img src={platformLootPage} alt="" />
            </PlatformLootPage>
          </PlatformLootPageWrapp>
        </PlatformLootPageWrapper>
      </PlatformWrapper>

      <ProductWrapper>
        <ProductPage>
          <ProdBGLeftEffect />
          <ProdBGRightEffect />
          <ProductLeft>
            <img src={productLeftImg} alt="" />
          </ProductLeft>
          <ProductText>
            <h2>our products</h2>
            <p>
              In voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident
            </p>
            <ProdTimer>
              <BorderTopRight />
              <BorderBotRight />
              <BorderTopLeft />
              <BorderBotLeft />
              <TimerTextProduct>until mint:</TimerTextProduct>
              <TimerLanding expiryTimestamp={time} />
            </ProdTimer>
          </ProductText>
          <ProductRight>
            <img src={productRightImg} alt="" />
          </ProductRight>
        </ProductPage>
      </ProductWrapper>

      <PassWrapper>
        <LeftPassTimer>
          <img src={passImg} alt="" />
          <h2>
            Premium <br /> season pass
          </h2>
          <p>
            In voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident
          </p>
          <TimerLanding expiryTimestamp={time} />
          <TedButton color="yellow" onclick={() => { }} size="big" width="320">
            Buy now for 0.2 ETH
          </TedButton>
          <StarPass />
          <PassBGEffect />
        </LeftPassTimer>
        <RightPass>
          <TopKart>
            <FreePass>
              <div>
                <h5>Free season pass</h5>
                <p>Lorem ipsum dolor</p>
                <img src={freeIconPass} alt="" />
              </div>
            </FreePass>
            <FreeKart
              src=""
              name="Head of Thrones"
              descr="Skin"
              coin={10}
              lock={true}
              active={true}
            />
            <FreeKart
              src=""
              name="Head of Thrones"
              descr="Skin"
              lock={false}
              active={false}
            />
            <FreeKart
              src=""
              name="Head of Thrones"
              descr="Skin"
              coin={5}
              lock={false}
              active={false}
            />
          </TopKart>
          <BotCart>
            <PremPass>
              <div>
                <h5>Premium season pass</h5>
                <p>Lorem ipsum dolor</p>
                <img src={premIconPass} alt="" />
              </div>
            </PremPass>
            <PremiumKart
              src=""
              name="Head of Thrones"
              descr="Skin"
              coin={80}
              lock={true}
              active={true}
            />
            <PremiumKart
              src=""
              name="Head of Thrones"
              descr="Skin"
              coin={40}
              lock={false}
              active={false}
            />
            <PremiumKart
              src=""
              name="Head of Thrones"
              descr="Skin"
              coin={60}
              lock={false}
              active={false}
            />
          </BotCart>
        </RightPass>
      </PassWrapper>

      <PetWrapper>
        <PetText>
          <h2>pets pass</h2>
          <p>
            In voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident
          </p>
          <TimerLanding expiryTimestamp={time} />
          <TedButton color="yellow" onclick={() => { }} size="modal" width="209">
            MINT NOW
          </TedButton>
        </PetText>
        <PetsImgWrapper>
          <TopPetImg>
            <img src={petImgLT} alt="" />
            <img src={petImgRT} alt="" />
          </TopPetImg>
          <BottomPetImg>
            <img src={petImgLB} alt="" />
            <img src={petImgRB} alt="" />
          </BottomPetImg>
        </PetsImgWrapper>
      </PetWrapper>

      <RoadMapWrapper>
        <RoadMapText>
          <h5>PROJECT DEVELOPMENT</h5>
          <h2>roadmap</h2>
          <p>
            The Mech Identity Protocol project is a new form of dynamic NFT
            collection which will be deployed in multiple phases, starting with
            10,000 Modular Mech Heads and their drivers. Mech Bodies will be
            releasing later down the line so you can combine and assemble your
            own fully customized Mech.
          </p>
        </RoadMapText>

        <RoadMapContent>
          <RoadItemsWrapper>
            <RoadMapItem>
              <img src={roadMap1} loading="lazy" alt="" />
            </RoadMapItem>
            <CircleStyled />
            <RoadMapText>
              <h2>Register of login</h2>
              <p>
                The Mech Identity Protocol project is a new form of dynamic NFT
                collection which will be deployed in multiple phases, starting
                with 10,000 Modular Mech Heads and their drivers. Mech Bodies
                will be releasing later down the line so you can combine and
                assemble your own fully customized Mech.
              </p>
            </RoadMapText>
          </RoadItemsWrapper>
          <RoadItemsWrapper>
            <RoadMapText>
              <h2>earn credits</h2>
              <p>
                The Mech Identity Protocol project is a new form of dynamic NFT
                collection which will be deployed in multiple phases, starting
                with 10,000 Modular Mech Heads and their drivers. Mech Bodies
                will be releasing later down the line so you can combine and
                assemble your own fully customized Mech.
              </p>
            </RoadMapText>
            <RoadMapItem>
              <img src={roadMap2} loading="lazy" alt="" />
            </RoadMapItem>
            <CircleStyled />
          </RoadItemsWrapper>
          <RoadItemsWrapper>
            <RoadMapItem>
              <img src={roadMap3} alt="" />
            </RoadMapItem>
            <CircleStyled />
            <RoadMapText>
              <h2>Register of login</h2>
              <p>
                The Mech Identity Protocol project is a new form of dynamic NFT
                collection which will be deployed in multiple phases, starting
                with 10,000 Modular Mech Heads and their drivers. Mech Bodies
                will be releasing later down the line so you can combine and
                assemble your own fully customized Mech.
              </p>
            </RoadMapText>
          </RoadItemsWrapper>
          <RoadItemsWrapper>
            <RoadMapText>
              <h2>earn credits</h2>
              <p>
                The Mech Identity Protocol project is a new form of dynamic NFT
                collection which will be deployed in multiple phases, starting
                with 10,000 Modular Mech Heads and their drivers. Mech Bodies
                will be releasing later down the line so you can combine and
                assemble your own fully customized Mech.
              </p>
            </RoadMapText>
            <RoadMapItem>
              <img src={roadMap4} loading="lazy" alt="" />
            </RoadMapItem>
            <CircleStyled />
          </RoadItemsWrapper>
          <RoadItemsWrapper>
            <RoadMapItem>
              <img src={roadMap5} loading="lazy" alt="" />
            </RoadMapItem>
            <CircleStyled />
            <RoadMapText>
              <h2>Register of login</h2>
              <p>
                The Mech Identity Protocol project is a new form of dynamic NFT
                collection which will be deployed in multiple phases, starting
                with 10,000 Modular Mech Heads and their drivers. Mech Bodies
                will be releasing later down the line so you can combine and
                assemble your own fully customized Mech.
              </p>
            </RoadMapText>
          </RoadItemsWrapper>
          <RoadItemsWrapper>
            <RoadMapText>
              <h2>earn credits</h2>
              <p>
                The Mech Identity Protocol project is a new form of dynamic NFT
                collection which will be deployed in multiple phases, starting
                with 10,000 Modular Mech Heads and their drivers. Mech Bodies
                will be releasing later down the line so you can combine and
                assemble your own fully customized Mech.
              </p>
            </RoadMapText>
            <RoadMapItem>
              <img src={roadMap6} loading="lazy" alt="" />
            </RoadMapItem>
            <CircleStyled />
          </RoadItemsWrapper>
        </RoadMapContent>
        <RoadMapLine />
      </RoadMapWrapper>

      <FactionsWrapper>
        <FactionsText>
          <h5>WHAT ARE MIPS?</h5>
          <h1>FACTIONS</h1>
          <p>
            The MIP project rise takes place during the transition of a Mech
            based civilization, in which the disbandment of the sole and
            monopolistic organization MECHCORP which has resulted in the
            creation of 8 main factions that now quarrel for the Mech supremacy.
          </p>
          <MechCorp>
            <TitleSimbol>
              <h2>M</h2>
              <div></div>
            </TitleSimbol>
            <h2>ECHCORP?</h2>
          </MechCorp>
          <h3>MALAYA</h3>
        </FactionsText>
        <FactionsImg>
          <ItemFaction>
            <img src={factionImgL} loading="lazy" alt="" />
            <h3>T1</h3>
          </ItemFaction>
          <BigItem>
            <img src={factionImgC} loading="lazy" alt="" />
            <h2>T3</h2>
          </BigItem>
          <ItemFaction>
            <img src={factionImgR} loading="lazy" alt="" />
            <h3>T2</h3>
          </ItemFaction>
        </FactionsImg>
      </FactionsWrapper>

      <Footer>
        <img src={footerLogo} loading="lazy" alt="" />
        <p>© 2021 MIPNetwork.com All rights reserved.</p>
      </Footer>
    </LandingPage>
  );
}

export default Landing;

const ItemsPass = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 130px;
  margin-bottom: 60px;
  > div {
    width: 425px;
    @media (max-width: 1440px) {
      width: 400px;
      height: 370px;
    }
    @media (max-width: 1366px) {
      width: 370px;
      height: 358px;
    }
  }
`;

const GrayButton = styled.div`
  height: 62px;
  border: 1px solid #3c4049;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 100px;
    display: flex;
    justify-content: center;
    > p {
      font-size: 16px;
      line-height: 16px;
      color: #fff;

      > span {
        opacity: 0.5;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  > div,
  button {
    margin-right: 20px;
  }
`;

const LeftText = styled.div`
  color: #a7b0cb;
  z-index: 1;
  > h4 {
    font-size: 16px;
    line-height: 16px;
  }
  > div {
    display: flex;
    margin-top: 18px;
    > h2 {
      font-family: Glitch;
      font-size: 40px;
      line-height: 24px;
      color: #ffffff;
      margin-top: 20px;
    }
    > img {
      height: 20px;
      margin-right: 10px;
    }
  }

  > div {
    > p {
      font-size: 14px;
      line-height: 24px;
    }
  }
`;

const Passport = styled.img`
  height: 300px;
  z-index: 1;
`;

const TextPass = styled.div`
  display: flex;
  z-index: 1;
  justify-content: center;
  > div {
    z-index: 1;
  }
`;

const MenuModalMobile = styled.div`
  position: absolute;
  right: 15px;
  top: 100px;
  z-index: 3;
`;
const MenuMobileItem = styled.div`
  height: 45px;
  width: 250px;
  margin: -1px;
  border: none;
  background-color: #161d24;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a0a4a9;
  text-transform: uppercase;
  :hover {
    background-color: #1c252e;
    color: #fff;
  }
`;

const AboutTitle = styled.div`
  margin-bottom: -220px;
  text-align: center;

  @media (max-width: 1024px) {
    margin-bottom: -100px;
  }
  @media (max-width: 1024px) {
    margin-bottom: -20px;
  }

  > h4 {
    color: #757b8b;
    font-size: 16px;
    line-height: 16px;
    text-transform: uppercase;
    margin-top: 150px;
  }

  > h2 {
    font-size: 56px;
    line-height: 40px;
    text-transform: uppercase;
    color: #ffffff;
    margin: 18px 0 32px 0;
    font-family: Glitch;
    @media (max-width: 414px) {
      font-size: 45px;
    }
    @media (max-width: 375px) {
      font-size: 40px;
    }
  }
`;

const AboutWrapper = styled.div`
overflow-hidden;
  @media (max-width: 820px) {
    margin-top: -70px;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  position: relative;

  @media (max-width: 920px) {
    display: block;
    padding: 12px;
    margin-bottom: 84px;
  }
`;

const Humburger = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  > div {
    width: 100%;
    margin-bottom: 6px;
    height: 4px;
    background-color: gray;
  }
  :hover {
    cursor: pointer;
  }
`;

const MobileMenu = styled.div`
  display: none;
  height: 72px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);

  > div:nth-child(1) {
    max-width: 25%;
    @media (max-width: 480px) {
      max-width: 40%;
    }
    @media (max-width: 414px) {
      margin-left: 12px;
    }
  }
  > div:nth-child(2) {
    margin-right: 16px;
  }

  @media (max-width: 480px) {
    display: flex;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 260px;
  p {
    font-size: 14px;
    line-height: 24px;
    color: #a7b0cb;
    margin-top: 24px;
  }
`;

const FactionsImg = styled.div`
  display: flex;

  @media (max-width: 680px) {
    position: relative;
    overflow: hidden;
    justify-content: center;
    width: 100%;
  }
  div {
    color: #ffffff;
    text-align: center;
    display: flex;
    flex-direction: column;
    :nth-child(1) {
      @media (max-width: 680px) {
        position: absolute;
        top: 38px;
        left: -1px;
      }
      @media (max-width: 480px) {
        top: 80px;
        left: -77px;
      }
      @media (max-width: 390px) {
        top: 155px;
        left: -129px;
      }
    }
    :nth-child(3) {
      @media (max-width: 680px) {
        position: absolute;
        right: 10px;
        top: 38px;
      }
      @media (max-width: 480px) {
        right: -56px;
        top: 75px;
      }
      @media (max-width: 390px) {
        right: -116px;
        top: 156px;
      }
    }

    > h2 {
      font-size: 56px;
      line-height: 42px;
      margin-top: 26px;
      font-family: Glitch;
    }

    > h3 {
      margin-top: 10px;
      font-size: 32px;
      line-height: 39px;
      font-family: Glitch;
    }
  }
`;

const BigItem = styled.div`
  margin: 90px 10px 0 10px;
  @media (max-width: 480px) {
    margin: 40px 0 0 0;
  }
  > img {
    @media (max-width: 1280px) {
      height: 300px;
    }
    @media (max-width: 820px) {
      height: 270px;
    }
    @media (max-width: 680px) {
      height: 230px;
      margin: 55px 0 0 0;
    }
    @media (max-width: 480px) {
      height: 230px;
    }
  }
`;

const ItemFaction = styled.div`
  h3 {
    font-family: Glitch;
  }

  > img {
    @media (max-width: 1280px) {
      height: 200px;
    }
    @media (max-width: 820px) {
      height: 160px;
    }
  }
`;

const TitleSimbol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 35px 0 0;
  @media (max-width: 1280px) {
    margin: 0;
  }
  h2 {
    font-family: Glitch;
    @media (max-width: 1280px) {
      margin: 0 32px 0 110px;
    }
    @media (max-width: 480px) {
      margin: 0 22px 0 25px;
    }
  }
  > div {
    margin-top: 16px;
    width: 24px;
    height: 2px;
    background: #00b6ff;
    box-shadow: 0px 4px 16px #00b6ff;
    @media (max-width: 1280px) {
      margin: 20px 0 0 80px;
    }
    @media (max-width: 480px) {
      margin: 9px 0 0 4px;
    }
  }
`;

const MechCorp = styled.div`
  font-family: Glitch;
  font-size: 48px;
  line-height: 32px;
  color: #ffffff;
  display: flex;
  margin: 80px 0 70px 0;
  @media (max-width: 1280px) {
    margin: 80px 0 70px -50px;
    font-size: 45px;
  }
  @media (max-width: 480px) {
    margin: 80px 0 70px 0;
    font-size: 27px;
  }

  > h2 {
    opacity: 0.15;
    letter-spacing: 44px;
    font-family: Glitch;
    @media (max-width: 1280px) {
      letter-spacing: 30px;
    }
    @media (max-width: 480px) {
      letter-spacing: 20px;
    }
    @media (max-width: 390px) {
      letter-spacing: 15px;
    }
  }
`;
const FactionsText = styled.div`
  width: 672px;
  text-align: center;
  @media (max-width: 480px) {
    width: 420px;
  }
  @media (max-width: 390px) {
    width: 380px;
  }

  h5 {
    font-size: 16px;
    line-height: 16px;
    color: #757b8b;
  }
  h1 {
    font-family: Glitch;
    font-size: 56px;
    line-height: 40px;
    color: #ffffff;
    margin: 16px 0 32px 0;
  }
  p {
    font-size: 14px;
    line-height: 24px;
    color: #a7b0cb;
  }
  h3 {
    font-family: Glitch;
    font-size: 40px;
    line-height: 32px;
    color: #ffffff;
  }
`;

const FactionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  height: 1080px;
  background-image: url(${factionBG});
  overflow: hidden;
  @media (max-width: 1280px) {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 100px;
    height: 880px;
  }
  @media (max-width: 820px) {
    background-image: url();
  }
`;

const CircleStyled = styled(RoadMapDoth)`
  position: absolute;
  top: 50%;
  left: 49.1%;
  @media (max-width: 1500px) {
    left: 48.8%;
  }
  @media (max-width: 1280px) {
    left: 48.8%;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;

const RoadItemsWrapper = styled.div`
  position: relative;
  img {
    border-radius: 12px;
    @media (max-width: 1280px) {
      width: 480px;
    }
    @media (max-width: 1180px) {
      width: 700px;
    }
    @media (max-width: 820px) {
      width: 565px;
    }
    @media (max-width: 680px) {
      width: 475px;
    }
    @media (max-width: 480px) {
      width: 400px;
    }
    @media (max-width: 414px) {
      width: 390px;
    }
    @media (max-width: 390px) {
      width: 360px;
    }
  }
`;

const RoadMapContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 540px) {
    margin-top: 40px;
  }
  @media (max-width: 390px) {
    margin-top: 50px;
  }
  div {
    display: flex;
    @media (max-width: 1180px) {
      flex-direction: column;
      z-index: 1;
      :nth-child(2n) {
        flex-direction: column-reverse;
      }
    }
    div {
      display: flex;
      flex-direction: column;
      align-self: center;
      margin: 30px 80px;
      text-align: start;

      @media (max-width: 1700px) {
        margin: 30px 40px;
      }
      @media (max-width: 1500px) {
        margin: 30px 40px;
        width: 600px;
      }
      @media (max-width: 1350px) {
        margin: 30px 30px;
        width: 540px;
      }
      @media (max-width: 1280px) {
        margin: 20px 60px;
        width: 460px;
      }
      @media (max-width: 1180px) {
        margin: 20px 60px;
        width: 700px;
        text-align: center;
      }
      @media (max-width: 820px) {
        margin: 70px 0 0 0;
        width: 550px;
      }
      @media (max-width: 680px) {
        margin: 55px 0 0 0;
        width: 470px;
      }
      @media (max-width: 480px) {
        width: 400px;
      }
      @media (max-width: 414px) {
        width: 390px;
      }
      @media (max-width: 390px) {
        width: 360px;
      }

      > h2 {
        font-size: 32px;
        line-height: 32px;
        text-transform: uppercase;
        color: #ffffff;
        @media (max-width: 820px) {
          margin-bottom: 5px;
        }
        @media (max-width: 390px) {
          font-size: 27px;
          margin-top: 0px;
        }
      }

      > p {
        margin-top: 16px;
        font-size: 14px;
        line-height: 24px;
        color: #a7b0cb;
      }
    }
  }
`;

const RoadMapItem = styled.div``;

const RoadMapLine = styled.div`
  position: absolute;
  margin-top: 160px;
  width: 1px;
  height: 93%;
  background: linear-gradient(
    180deg,
    rgba(0, 182, 255, 0) 0%,
    #00b6ff 10.68%,
    #00b6ff 88.15%,
    rgba(0, 182, 255, 0) 100%
  );
  filter: drop-shadow(0px 0px 32px #00b6ff);
`;

const RoadMapText = styled.div`
  width: 672px;
  height: 176px;
  text-align: center;
  @media (max-width: 820px) {
    margin-top: 20px !important;
  }
  @media (max-width: 680px) {
    width: 90%;
  }
  @media (max-width: 600px) {
  }
  @media (max-width: 550px) {
  }
  @media (max-width: 480px) {
    width: 420px;
  }
  @media (max-width: 414px) {
    width: 390px;
  }
  @media (max-width: 390px) {
    width: 350px;
  }

  h5 {
    font-size: 16px;
    line-height: 16px;
    color: #757b8b;
  }

  h2 {
    font-family: Glitch;
    font-size: 56px;
    line-height: 40px;
    text-transform: uppercase;
    color: #ffffff;
    margin: 16px 0 32px 0;
    @media (max-width: 390px) {
      font-size: 45px;
    }
  }

  p {
    font-size: 14px;
    line-height: 24px;
    color: #a7b0cb;
  }
`;

const RoadMapWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    height: 3840px;
  }
  @media (max-width: 820px) {
    height: 3500px;
  }
  @media (max-width: 680px) {
    height: 3250px;
  }
  @media (max-width: 480px) {
    height: 3250px;
  }
  @media (max-width: 414px) {
    height: 3025px;
  }
`;

const PetsImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  @media (max-width: 600px) {
    display: none;
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    @media (max-width: 1080px) {
      justify-content: space-between;
    }
  }

  div:last-child {
    @media (max-width: 1400px) {
      justify-content: space-between;
    }
  }
`;

const TopPetImg = styled.div`
  img:first-child {
    height: 280px;
    width: 280px;
    margin-right: 700px;
    margin-top: -70px;
    @media (max-width: 1400px) {
      margin-right: 500px;
    }
    @media (max-width: 1280px) {
      margin-right: 400px;
      margin-top: -57px;
    }
    @media (max-width: 1080px) {
      margin-right: 0;
      margin-top: -40px;
    }
    @media (max-width: 1024px) {
      margin-top: -33px;
    }
    @media (max-width: 820px) {
      height: 236px;
      width: 218px;
    }
  }
  img:last-child {
    height: 353px;
    width: 353px;
    margin-left: 34px;
    @media (max-width: 860px) {
      height: 290px;
      width: 290px;
    }
    @media (max-width: 820px) {
      height: 250px;
      width: 250px;
    }
  }
`;

const BottomPetImg = styled.div`
  @media (max-width: 860px) {
    margin-top: 80px;
  }
  @media (max-width: 820px) {
    margin-top: 100px;
  }
  img:first-child {
    height: 418px;
    width: 418px;
    @media (max-width: 860px) {
      height: 300px;
      width: 300px;
    }
    @media (max-width: 820px) {
      height: 250px;
      width: 250px;
    }
  }
  img:last-child {
    height: 256px;
    width: 256px;
    place-self: end;
    @media (max-width: 820px) {
      height: 190px;
      width: 190px;
    }
  }
`;

const PetText = styled.div`
  width: 496px;
  height: 262px;

  @media (max-width: 600px) {
    width: 90%;
  }

  > div:nth-child(3) {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }

  h2 {
    font-family: Glitch;
    font-size: 48px;
    line-height: 40px;
    text-transform: uppercase;
    color: #ffffff;
    @media (max-width: 375px) {
      font-size: 45px;
    }
  }

  p {
    font-size: 16px;
    line-height: 24px;
    color: #8c9fb4;
    margin: 24px 0 27px 0;
  }
`;

const PetWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 770px;
  background-image: url(${mainPetBG});
  @media (max-width: 820px) {
    height: 676px;
  }
`;

const FreePass = styled.div`
  background-image: url(${freeBGPass});
  background-repeat: no-repeat;
  border-radius: 12px;
  margin-top: 39px;
  height: 300px;
  width: 200px;
  text-align: center;

  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 106px;
    > div {
      transform: rotate(-90deg);
    }
  }

  h5 {
    padding-top: 20px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  p {
    margin: 6px 0 20px 0;
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }

  img {
    margin-top: 36px;
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const PremPass = styled.div`
  background-image: url(${premBGPass});
  background-repeat: no-repeat;
  border-radius: 12px;
  position: relative;
  height: 300px;
  margin-top: 52px;
  width: 200px;
  text-align: center;

  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 106px;
    > div {
      transform: rotate(-90deg);
    }
  }

  h5 {
    padding-top: 20px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  p {
    margin: 6px 0 22px 0;
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }

  img {
    margin-top: 36px;
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const TopKart = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  > div:nth-child(2) {
    margin-top: 20px;
  }
  @media (max-width: 960px) {
    > div:last-child {
      display: none;
    }
  @media (max-width: 640px) {
      > div:nth-child(3) {
        display: none;
      }
  }
`;

const BotCart = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  > div:nth-child(2) {
    margin-top: 20px;
  }
  @media (max-width: 960px) {
    > div:last-child {
      display: none;
    }
  }
  @media (max-width: 640px) {
    > div:nth-child(3) {
      display: none;
    }
  }
`;

const StarPass = styled(StarPassBG)`
  position: absolute;
  left: -60px;
  transform: rotate(-25deg);
  top: 26px;
`;

const PassBGEffect = styled(EffectPassBG)`
  position: absolute;
  left: 0;
  transform: rotate(-25deg);
  fill: #00a3ff;
  height: 800px;
  width: 800px;
  @media (max-width: 1280px) {
    left: 242px;
  }
  @media (max-width: 1024px) {
    left: 127px;
  }
  @media (max-width: 820px) {
    left: 32px;
  }
  @media (max-width: 768px) {
    top: -59px;
    left: -29px;
  }
  @media (max-width: 480px) {
    left: -100px;
  }
`;

const LeftPassTimer = styled.div`
  width: 359px;
  height: 745px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  img {
    margin-right: 60px;
    z-index: 1;
    @media (max-width: 820px) {
      margin-right: 0px;
    }
    @media (max-width: 480px) {
      margin-bottom: 50px;
    }
  }

  h2 {
    font-family: Glitch;
    font-size: 32px;
    line-height: 48px;
    text-transform: uppercase;
    color: #ffffff;
    margin: -130px 0 13px 0;
    z-index: 1;
    @media (max-width: 820px) {
      margin-top: -96px;
    }
  }
  p {
    font-size: 12px;
    line-height: 16px;
    color: #616d7a;
    z-index: 1;
  }
  > div {
    margin-top: 30px;
    z-index: 1;
  }
`;

const RightPass = styled.div`
  width: 900px;
  height: 742px;
  z-index: 2;
  margin: 300px 0 0 120px;
  @media (max-width: 1280px) {
    margin: 100px 0 0 0;
  }
  @media (max-width: 960px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 130px;
  }
  @media (max-width: 680px) {
    width: 97%;
  }
  @media (max-width: 640px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 515px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    margin-top: 200px;
    width: 72%;
  }
  @media (max-width: 414px) {
    width: 80%;
  }
  @media (max-width: 390px) {
    width: 83%;
  }
  @media (max-width: 375px) {
    width: 87%;
  }
`;

const PassWrapper = styled.div`
  background-image: url(${passMainBG});
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 1280px) {
    flex-direction: column;
    height: 1460px;
  }
`;

const ProdBGLeftEffect = styled(ProductBGLeftEffect)`
  width: 550px;
  position: absolute;
  top: 85px;
  left: 112px;
  z-index: 0;
  @media (max-width: 1280px) {
    top: 40px;
    left: 30px;
  }
  @media (max-width: 1024px) {
    top: 16px;
    left: 30px;
    width: 384px;
  }
  @media (max-width: 860px) {
    top: -70px;
    left: 416px;
    width: 494px;
  }
  @media (max-width: 730px) {
    left: 265px;
  }
  @media (max-width: 730px) {
    left: 118px;
  }
  @media (max-width: 480px) {
    top: -90px;
    left: 24px;
    width: 553px;
  }
`;
const ProdBGRightEffect = styled(ProductBGRightEffect)`
  width: 550px;
  position: absolute;
  bottom: -50px;
  right: 95px;
  z-index: 0;

  @media (max-width: 1280px) {
    bottom: 87px;
  }
  @media (max-width: 860px) {
    bottom: -56px;
    right: -40px;
  }
  @media (max-width: 820px) {
    bottom: -56px;
    right: -35px;
  }
  @media (max-width: 480px) {
    width: 555px;
    bottom: -76px;
    right: -54px;
  }
`;

const TimerTextProduct = styled.h3`
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: #ffffff;
  margin-right: 20px;
  font-family: Glitch;
  @media (max-width: 480px) {
    margin-right: 0;
  }
`;

const ProductLeft = styled.div`
  width: 435px;
  @media (max-width: 1545px) {
    width: 529px;
  }
  @media (max-width: 1460px) {
    width: 445px;
  }
  @media (max-width: 1280px) {
    width: 290px;
  }
  @media (max-width: 1150px) {
    width: 270px;
  }
  @media (max-width: 1024px) {
    width: 300px;
  }
  @media (max-width: 860px) {
    position: absolute;
    top: -130px;
    left: -40px;
  }
  @media (max-width: 720px) {
    width: 250px;
  }
  @media (max-width: 480px) {
    height: 240px;
    top: -175px;
    left: -57px;
  }

  > img {
    @media (max-width: 1545px) {
      height: 470px;
    }
    @media (max-width: 1460px) {
      height: 400px;
    }
    @media (max-width: 1280px) {
      width: 100%;
      height: 279px;
    }
    @media (max-width: 1024px) {
      height: 230px;
    }
    @media (max-width: 820px) {
      height: 225px;
    }
    @media (max-width: 480px) {
      height: 230px;
    }
  }
`;
const ProductText = styled.div`
  width: 456px;
  text-align: center;
  justify-content: end;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;

  @media (max-width: 1280px) {
    width: 400px;
  }
  @media (max-width: 1150px) {
    width: 445px;
    margin-bottom: 55px;
  }
  @media (max-width: 860px) {
    height: 320px;
    width: 100%;
    background-color: #141b23;
    justify-content: flex-start;
  }
  @media (max-width: 480px) {
    height: 460px;
  }

  > h2 {
    font-size: 48px;
    line-height: 40px;
    text-transform: uppercase;
    color: #ffffff;
    font-family: Glitch;
    @media (max-width: 1280px) {
      font-size: 44px;
    }
    @media (max-width: 1024px) {
      font-size: 35px;
    }
    @media (max-width: 860px) {
      margin-top: 32px;
    }
  }

  > p {
    font-size: 16px;
    line-height: 24px;
    color: #8c9fb4;
    margin-top: 16px;
    @media (max-width: 1024px) {
      font-size: 14px;
      width: 350px;
    }
    @media (max-width: 860px) {
      margin: 10px 0 24px 0;
      font-size: 15px;
    }
  }

  > div {
    width: 416px;
    height: 80px;
    @media (max-width: 1024px) {
      width: 272px;
      height: 90px;
      display: flex;
      flex-direction: column;
    }
    @media (max-width: 820px) {
      width: 250px;
      height: 110px;
    }
    @media (max-width: 480px) {
      width: 328px;
      height: 152px;
    }

    div {
      font-size: 24px;
      line-height: 32px;
      margin: 0;
    }
  }

  div {
    div {
      div {
        @media (max-width: 480px) {
          margin-top: 10px;
        }
        @media (max-width: 414px) {
          margin-top: 12px;
        }
        > div {
          width: 44px;
          height: 48px;
          @media (max-width: 480px) {
            width: 55px;
            height: 50px;
          }
        }
      }
    }
  }
`;
const ProductRight = styled.div`
  @media (max-width: 1280px) {
    width: 340px;
  }
  @media (max-width: 1150px) {
    width: 280px;
  }
  @media (max-width: 860px) {
    display: none;
  }
  > img {
    margin-top: 31px;
    @media (max-width: 1545px) {
      width: 414px;
      margin-top: 9px;
    }
    @media (max-width: 1460px) {
      width: 370px;
      margin-top: 64px;
    }
    @media (max-width: 1280px) {
      height: auto;
      margin-top: 79px;
      width: 254px;
    }
    @media (max-width: 1150px) {
      width: 242px;
    }
    @media (max-width: 1024px) {
      width: 180px;
    }
  }
`;

const ProductPage = styled.div`
  background-repeat: no-repeat;
  background-image: url(${productBGImg});
  width: 1636px;
  height: 552px;
  display: flex;
  justify-content: space-between;
  margin-top: 170px;
  position: relative;
  z-index: 2;
  @media (max-width: 1600px) {
    width: 1500px;
    height: 560px;
  }
  @media (max-width: 1545px) {
    width: 1400px;
    height: 530px;
  }
  @media (max-width: 1460px) {
    width: 1300px;
    height: 530px;
    margin-right: 100px;
  }
  @media (max-width: 1280px) {
    width: 1180px;
    height: 433px;
    background-size: contain;
    margin-right: 10px;
  }
  @media (max-width: 1024px) {
    margin-top: 55px;
    width: 900px;
    height: 346px;
  }
  @media (max-width: 860px) {
    background-image: url();
    width: 100%;
    margin-top: 100px;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 860px) {
    overflow: hidden;
    height: 579px;
  }
`;

const PlatformLootPageWrapp = styled.div`
  background-color: black;
  width: 957px;
  height: 578px;
  border-radius: 12px;
  @media (max-width: 1280px) {
    width: 700px;
    height: 403px;
  }
`;

const PlatformLootPage = styled.div`
  width: 957px;
  height: 578px;
  border-radius: 12px;
  background-image: url(${platformBGLoot});
  position: relative;

  @media (max-width: 1280px) {
    width: 494px;
    height: 386px;
  }

  > img {
    position: absolute;
    left: -107px;
    top: -29px;
    width: 1170px;
    @media (max-width: 1280px) {
      left: -76px;
      top: -29px;
      width: 850px;
    }
  }
`;

const PlatformLootPageWrapper = styled.div`
  width: 957px;
  height: 628px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: -160px;
  @media (max-width: 1610px) {
    bottom: -90px;
  }
  @media (max-width: 1450px) {
    bottom: -35px;
  }
  @media (max-width: 1280px) {
    bottom: -195px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
const PlatformLootTabs = styled.div`
  width: 800px;
  height: 50px;
  font-size: 14px;
  line-height: 17px;
  flex-grow: 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1280px) {
    width: 625px;
    height: 40px;
  }

  > div {
    color: #7f8593;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  > div:first-child {
    color: #fff;
    background: black;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
`;

const PlatformText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 650px;

  @media (max-width: 1024px) {
    margin-top: 60px;
  }
  @media (max-width: 680px) {
    width: auto;
  }

  > p {
    font-size: 14px;
    line-height: 24px;
    color: #a7b0cb;
    @media (max-width: 1024px) {
      width: 320px;
      align-self: center;
      margin-top: 100px;
    }
    @media (max-width: 480px) {
      width: auto;
      margin: 10px 50px 0 50px;
    }
  }
  > h4 {
    font-size: 16px;
    line-height: 16px;
    color: #757b8b;
  }
  > h2 {
    font-family: Glitch;
    font-size: 56px;
    line-height: 40px;
    color: #ffffff;
    margin: 16px 0 32px 0;
    @media (max-width: 414px) {
      font-size: 45px;
    }
    @media (max-width: 375px) {
      font-size: 40px;
    }
  }
`;

const PlatformWrapper = styled.div`
  background-image: url(${platformBG});
  height: 904px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 1280px) {
    height: 604px;
  }
  @media (max-width: 480px) {
    background-image: url();
    margin-top: 125px;
    height: 410px;
  }
  @media (max-width: 375px) {
    margin-top: 0;
  }
`;

const AboutLeftRobotEffect = styled(aboutEffectRobot)`
  position: absolute;
  left: -85px;
  top: 25px;
  @media (max-width: 1420px) {
    height: 1200px;
    left: -139px;
    top: 45px;
  }
  @media (max-width: 1280px) {
    height: 1000px;
    left: -209px;
    top: 100px;
  }
  @media (max-width: 1024px) {
    height: 1000px;
    left: -209px;
    top: 10px;
  }
  @media (max-width: 780px) {
    height: 1000px;
    left: -43px;
    top: -100px;
  }
  @media (max-width: 660px) {
    left: -90px;
  }
  @media (max-width: 590px) {
    left: -140px;
  }
  @media (max-width: 480px) {
    left: -188px;
    top: -6px;
  }
  @media (max-width: 414px) {
    left: -222px;
  }
  @media (max-width: 390px) {
    height: 900px;
    left: -241px;
    top: 35px;
  }
  @media (max-width: 375px) {
    left: -259px;
  }
`;

const AboutPhaseTextImg = styled.div`
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  position: absolute;
  bottom: 110px;
  width: 100%;
  z-index: 1;
  h6 {
    font-family: Glitch;
  }
  h1 {
    font-family: Glitch;
  }
  @media (max-width: 1024px) {
    bottom: 0;
  }
  @media (max-width: 780px) {
    bottom: -100px;
  }
  @media (max-width: 480px) {
    bottom: -100px;
  }
  @media (max-width: 414px) {
    bottom: -120px;
  }
`;

const PhaseLeft = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > img {
    z-index: 1;
    @media (max-width: 1420px) {
      height: 500px;
    }
    @media (max-width: 1280px) {
      height: 400px;
    }
    @media (max-width: 780px) {
      display: flex;
      justify-content: center;
    }
    @media (max-width: 480px) {
      height: 470px;
      margin-top: 40px;
    }
    @media (max-width: 414px) {
      height: 400px;
      margin-top: 96px;
    }
    @media (max-width: 375px) {
      height: 368px;
    }
  }
`;

const AboutText = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 50px;

  @media (max-width: 1700px) {
  }
  @media (max-width: 1024px) {
    margin-right: 50px;
  }
  @media (max-width: 660px) {
    margin-top: 50px;
  }
  @media (max-width: 414px) {
    margin-top: 150px;
  }
  @media (max-width: 375px) {
    margin-top: 130px;
  }

  > p {
    font-size: 14px;
    line-height: 24px;
    color: #a7b0cb;
  }
`;

const PhaseRight = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  position: relative;
  width: 580px;
  overflow: hidden;
  @media (max-width: 1280px) {
    width: 400px;
    margin-top: 130px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const AboutContent = styled.div`
  height: 860px;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  > div {
    width: 33%;
    @media (max-width: 1024px) {
      width: 50%;
      height: 670px;
    }
    @media (max-width: 780px) {
      width: 90%;
      height: 970px;
      justify-content: center;
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 480px) {
    height: 1000px;
  }
  @media (max-width: 375px) {
    height: 1000px;
  }
`;

const ArrowGalleryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 70%;
  margin-left: 35px;
  @media (max-width: 820px) {
    width: 90%;
    margin-left: 30px;
  }
  @media (max-width: 768px) {
    width: 95%;
  }
  @media (max-width: 414px) {
    margin-left: 45px;
  }
  > svg {
    @media (max-width: 820px) {
      height: 40px;
    }
  }
`;

const GalleryLeft = styled(galleryArrowLeft)`
  transform: matrix(-1, 0, 0, 1, 0, 0);
`;
const GalleryRight = styled(galleryArrowRight)``;

const GalleryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 160px;
  padding-right: 50px;
  position: relative;
  -webkit-box-shadow: 100px 0px 69px -24px rgba(0, 0, 0, 0.46) inset;
  -moz-box-shadow: 100px 0px 69px -24px rgba(0, 0, 0, 0.46) inset;
  box-shadow: 100px 0px 69px -24px rgba(0, 0, 0, 0.46) inset;
  -webkit-box-shadow: -100px 0px 69px -24px rgba(0, 0, 0, 0.46) inset;
  -moz-box-shadow: -100px 0px 69px -24px rgba(0, 0, 0, 0.46) inset;
  box-shadow: -100px 0px 69px -24px rgba(0, 0, 0, 0.46) inset;
  @media (max-width: 1280px) {
    margin-top: 80px;
  }
  @media (max-width: 1280px) {
    div:nth-child(1),
    div:nth-child(5) {
      display: none;
  }
  @media (max-width: 820px) {
    div:nth-child(2),
    div:nth-child(4) {
      display: none;
  }
`;

const ProdTimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  width: 528px;
  height: 96px;
  position: relative;
  margin-top: 56px;
  @media (max-width: 1024px) {
    margin-top: 13px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;

  > img {
    margin: -50px 0 14px 0;
    @media (max-width: 1500px) {
      display: none;
    }
  }
`;

const BorderTopRight = styled(BorderItems)`
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(90deg);
`;
const BorderTopLeft = styled(BorderItems)`
  position: absolute;
  top: 0;
  left: 0;
`;
const BorderBotRight = styled(BorderItems)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotate(180deg);
`;
const BorderBotLeft = styled(BorderItems)`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: rotate(270deg);
`;

const LandingPage = styled.div`
  background: #050b1c;
`;

const MenuContainer = styled.div`
  color: #afc0d1;
  padding: 40px 20px 0 80px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1500px) {
    margin-bottom: 100px;
  }
  @media (max-width: 1280px) {
    padding: 20px;
  }
  @media (max-width: 1024px) {
    margin-bottom: 160px;
    padding: 15px 15px 0 15px;
  }
  @media (max-width: 920px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  height: 1321px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${menuBG});
  box-sizing: border-box;
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 1500px) {
    height: 939px;
  }
  @media (max-width: 1024px) {
    height: 740px;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url();
  }
  @media (max-width: 820px) {
    height: 676px;
  }
  @media (max-width: 768px) {
    height: 700px;
  }
  @media (max-width: 480px) {
    background: #050b1c;
    height: 800px;
  }
`;

const IconItem = styled.div`
  margin-right: 30px;
  @media (max-width: 820px) {
    margin-right: 15px;
  }
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const LeftMenu = styled.div`
  z-index: 1;
  text-transform: uppercase;
  width: 50%;
  padding-left: 24px;
  position: relative;
  display: flex;
  align-items: center;
  height: 72px;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 100%,
    rgba(255, 255, 255, 0.05) 0%
  );
  @media (max-width: 1024px) {
    width: 42%;
  }
  @media (max-width: 960px) {
    width: 36%;
  }
  @media (max-width: 820px) {
    width: 44%;
  }

  > div {
    display: flex;
    align-items: center;
    > svg {
      margin-right: 8px;
    }
  }
`;

const RightMenu = styled.div`
  width: 50%;
  flex-basis: content;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  height: 72px;
  padding-right: 24px;
  position: relative;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0) 100%
  );

  > div {
    display: flex;
    align-items: center;
    > svg {
      margin-right: 8px;
    }
  }
`;

const IconOpenSea = styled(iconSea)``;
const IconTwitter = styled(iconTwitter)``;
const IconDiscord = styled(iconDiscord)``;
const IconHome = styled(iconHome)``;
const IconGarage = styled(iconGarage)``;
const IconAbout = styled(iconAbout)``;
