import styled from "styled-components";
import loadable from '@loadable/component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect, ticketPay } from "../metamask/balanceAndGaragePaidExample";
import { ReactComponent as BgEffect2 } from "../assets/img/bgEffectPass2.svg";
import { ReactComponent as BgEffect1 } from "../assets/img/bgEffectPass1.svg";
import { ReactComponent as Star } from "../assets/img/starSpinnerBG.svg";
import passHeaderBg from "../assets/img/bgImgPass.png";
import FlyPass1 from "../assets/img/flyTicket1.png";
import FlyPass2 from "../assets/img/flyTicket2.png";
import FlyPass3 from "../assets/img/flyTicket3.png";
import passport from "../assets/img/passport.png";
import accept from "../assets/img/correct.png";
import { TicketPayType } from "../utils/commonTypes";

const TedButton = loadable(() => import('../components/common/Button/TedButton'));
const LandingItem = loadable(() => import('../components/LandingItem'));

type SeasonpassPropsType = {
  lvl: number;
  tickets: TicketPayType[];
};

const Seasonpass = (props: SeasonpassPropsType) => {
  const handlePayTicket = (ticketId: number) => {
    connect().then(() => {
      ticketPay(ticketId);
    });
  };

  const checkTicketButtonDisable = (id: number) => {
    return !!props.tickets.filter(ticket => ticket.token_id === id).length;
  };

  return (
    <MainContainer>
      <SeasonpassContainer>
        <HeaderInfoPass>
          <BgEffect1Styled />
          <BgEffect2Styled />

          <StarPass1 />
          <StarPass2 />

          <Pass1 src={FlyPass1} />
          <Pass2 src={FlyPass2} />
          <Pass3 src={FlyPass3} />
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
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={accept} />
                <p>Limited to 1 mint per wallet address Independent</p>
              </div>
              <div>
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={accept} />
                <p>Ut enim ad minim veniam, quis nostrud exercitation</p>
              </div>
              <div>
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={accept} />
                <p>Сonsectetur adipiscing elit, sed do eiusmod</p>
              </div>
              <div>
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={accept} />
                <p>Excepteur sint occaecat cupidatat non proident</p>
              </div>
              <div>
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={accept} />
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
                  onclick={() => handlePayTicket(6)}
                  size="big"
                  width="192"
                  children="ACTIVATE TICKET"
                  active={true}
                  disabled={checkTicketButtonDisable(6)}
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
        </HeaderInfoPass>
      </SeasonpassContainer>
      <ItemsPass>
        <LandingItem
          disable={checkTicketButtonDisable(3)}
          ticketId={3}
          type={"body"}
        />
        <LandingItem
          disable={checkTicketButtonDisable(4)}
          ticketId={4}
          type={"pass"}
        />
        <LandingItem
          disable={checkTicketButtonDisable(2)}
          ticketId={2}
          type={"pet"}
        />
      </ItemsPass>
    </MainContainer>
  );
};

export default Seasonpass;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  > div,
  button {
    margin-right: 20px;
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
    > span > img {
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

const ItemsPass = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 220px;
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextPass = styled.div`
  display: flex;
  z-index: 1;
  justify-content: center;
  margin-top: 48px;
  > div {
    z-index: 1;
  }
`;

const Pass1 = styled.img`
  position: absolute;
  z-index: 0;

  top: -100px;
  left: 50px;
`;

const Pass2 = styled.img`
  position: absolute;
  z-index: 0;

  top: 40px;
  left: 1570px;
`;

const Pass3 = styled.img`
  position: absolute;
  z-index: 0;

  top: 180px;
  right: 100px;
`;

const StarPass1 = styled(Star)`
  position: absolute;
  z-index: 0;

  top: -15px;
  left: -210px;
  width: 700px;
  @media (max-width: 1440px) {
    left: -91px;
  }
`;

const StarPass2 = styled(Star)`
  position: absolute;
  z-index: 0;

  top: -15px;
  right: -95px;
  width: 700px;
`;

const BgEffect1Styled = styled(BgEffect1)`
  position: absolute;
  top: -4px;
  left: 0px;
  z-index: 1;
  height: 450px;
`;

const BgEffect2Styled = styled(BgEffect2)`
  position: absolute;
  top: -140px;
  width: 100%;
`;
const SeasonpassContainer = styled.div`
  // background-image: url(${passHeaderBg});
  height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
`;

const HeaderInfoPass = styled.div`
  position: relative;
  overflow: hidden;
`;
