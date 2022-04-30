import styled from "styled-components";
import passHeaderBg from "../assets/img/bgImgPass.png";
import { ReactComponent as BgEffect2 } from "../assets/img/bgEffectPass2.svg";
import { ReactComponent as BgEffect1 } from "../assets/img/bgEffectPass1.svg";
import { ReactComponent as Star } from "../assets/img/starSpinnerBG.svg";
import FlyPass1 from "../assets/img/flyTicket1.png";
import FlyPass2 from "../assets/img/flyTicket2.png";
import FlyPass3 from "../assets/img/flyTicket3.png";
import TedButton from "../components/common/Button/TedButton";
import { TimerPass } from "../components/common/TimerPassFinished";
import Slider from "react-slick";
import FreeKart from "../components/Pass/FreeKart/FreeKart";
import PremiumKart from "../components/Pass/PremiumKart/PremiumKart";
import freeIconPass from "../assets/img/freePassIconTittle.svg";
import premIconPass from "../assets/img/premPassIconTittle.png";
import premBGPass from "../assets/img/premPassBGTittle.png";
import freeBGPass from "../assets/img/freePassBGTittle.png";
import { ReactComponent as BonArrow } from "../assets/img/bonusesArrow.svg";
import { useGetSeasonPass } from "../hooks/useGetSeasonPass";
import CustomLoader from "../components/common/Loader";

type SeasonpassPropsType = {
  lvl: number;
};

export const Seasonpass = (props: SeasonpassPropsType) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 70000);

  const { data: seasonPassData, isLoading } = useGetSeasonPass();

  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 5,
    prevArrow: <PrevBtn />,
    nextArrow: <NextBtn />,
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
            <h3>Premium season pass</h3>
            <p>
              But because those who do not know how to pursue pleasure
              rationally encounter consequences that
            </p>
            <TimerPassBut>
              <TimerPass expiryTimestamp={time} />
              <BtnWrap>
                <TedButton
                  width="250"
                  color="yellow"
                  size="big"
                  onclick={() => {}}
                >
                  Buy now
                </TedButton>
              </BtnWrap>
            </TimerPassBut>
          </TextPass>
        </HeaderInfoPass>
        <QuestionPassWrapper></QuestionPassWrapper>
      </SeasonpassContainer>
      {isLoading ? (
        <CustomLoader margin="50px auto" />
      ) : (
        <PassWrapper>
          <SliderWrapp {...settings}>
            {seasonPassData?.data &&
              seasonPassData.data.map(item => (
                <>
                  <FreeKart
                    src={
                      item.free_pass.loots?.length
                        ? item.free_pass.loots[0].images[0].key
                        : ""
                    }
                    descr={
                      item.free_pass.tokens
                        ? "Tokens"
                        : item.free_pass.description_tier
                    }
                    lock={props.lvl > item.level}
                    name={item.free_pass.tokens ? "" : item.free_pass.tier}
                    coin={item.free_pass.tokens || null}
                    active={props.lvl === item.level}
                    robot={!!item.free_pass.loots?.length}
                    key={`${item.nextXp}${Math.random()}`}
                  />
                  <PremiumKart
                    src={
                      item.premium_pass.loots?.length
                        ? item.premium_pass.loots[0].images[0].key
                        : ""
                    }
                    descr={
                      item.premium_pass.tokens
                        ? "Tokens"
                        : item.premium_pass.description_tier
                    }
                    lock={props.lvl > item.level}
                    name={
                      item.premium_pass.tokens ? "" : item.premium_pass.tier
                    }
                    coin={item.premium_pass.tokens || null}
                    robot={!!item.premium_pass.loots?.length}
                    active={props.lvl === item.level}
                  />
                  <LvLPass curLvl={item.level === props.lvl}>
                    <PrefLine active={props.lvl >= item.level}></PrefLine>
                    <LvlItem>
                      {item.level}{" "}
                      <Circle active={props.lvl < item.level}></Circle>
                    </LvlItem>
                    <BeforeLine active={props.lvl > item.level}></BeforeLine>
                  </LvLPass>
                </>
              ))}
          </SliderWrapp>

          <FreePass>
            <div>
              <h5>Free season pass</h5>
              <p>Lorem ipsum dolor</p>
              <img src={freeIconPass} alt="" />
            </div>
          </FreePass>

          <PremPass>
            <div>
              <h5>Premium season pass</h5>
              <p>Lorem ipsum dolor</p>
              <img src={premIconPass} alt="" />
            </div>
          </PremPass>
        </PassWrapper>
      )}
    </MainContainer>
  );
};

const NextBtn = styled(BonArrow)`
  fill: #616d7a;

  :hover {
    fill: #fff;
  }
`;

const PrevBtn = styled(BonArrow)`
  transform: matrix(-1, 0, 0, 1, 0, 0);
  left: -120px;
  fill: #616d7a;

  :hover {
    fill: #fff;
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
  position: absolute;
  left: -60px;
  top: -1px;
  -webkit-box-shadow: 49px 0px 51px 5px rgba(0, 0, 0, 0.54);
  -moz-box-shadow: 49px 0px 51px 5px rgba(0, 0, 0, 0.54);
  box-shadow: 49px 0px 51px 5px rgba(0, 0, 0, 0.54);

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
  position: absolute;
  left: -60px;
  bottom: 100px;
  -webkit-box-shadow: 49px 0px 51px 5px rgba(0, 0, 0, 0.54);
  -moz-box-shadow: 49px 0px 51px 5px rgba(0, 0, 0, 0.54);
  box-shadow: 49px 0px 51px 5px rgba(0, 0, 0, 0.54);

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

const PassWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  padding-bottom: 70px;
`;

const Circle = styled.div<{
  active: boolean;
}>`
width: 16px;
height: 16px;
background: ${props => (props.active ? `#25313D;` : `#29efa8;`)}
border-radius: 12px;
margin-left: 8px;
`;

const BeforeLine = styled.div<{
  active: boolean;
}>`
background:${props => (props.active ? `#29efa8;` : `#25313d;`)}
  height: 4px;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

const LvlItem = styled.div`
  display: flex;
  margin: 0 10px 0 10px;
`;

const PrefLine = styled.div<{
  active: boolean;
}>`
  background:${props => (props.active ? `#29efa8;` : `#25313d;`)} 
  height: 4px;
  width: 150px;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;

const LvLPass = styled.div<{
  curLvl: boolean;
}>`
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => (props.curLvl ? `-10px` : `10px`)};
`;

const SliderWrapp = styled(Slider)`
  width: 1200px;
  > div {
    margin: 0 20px;
    > div {
      > div:first-child {
        > div {
          > div:last-child {
            > div:first-child {
              background: none;
            }
          }
        }
      }
    }
    > div {
      > div:last-child {
        > div {
          > div:last-child {
            > div:last-child {
              background: none;
            }
          }
        }
      }
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnWrap = styled.div`
  width: 320px;
  align-self: center;
`;

const TimerPassBut = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;

  button {
    margin-left: 48px;
    width: 320px;
  }
`;

const TextPass = styled.div`
  z-index: 1;
  text-align: center;
  top: 71px;
  left: 27%;
  position: absolute;

  h3 {
    font-size: 40px;
    line-height: 48px;
    color: #ffffff;
    margin-bottom: 8px;
  }
  p {
    font-size: 16px;
    line-height: 19px;
    color: #c9cdd1;
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
  left: 1450px;
`;

const StarPass1 = styled(Star)`
  position: absolute;
  z-index: 0;

  top: -15px;
  left: -210px;
  width: 700px;
`;

const StarPass2 = styled(Star)`
  position: absolute;
  z-index: 0;

  top: -15px;
  left: 1000px;
  width: 700px;
`;

const BgEffect1Styled = styled(BgEffect1)`
  position: absolute;
  top: -160px;
  left: 240px;
  z-index: 1;
`;

const BgEffect2Styled = styled(BgEffect2)`
  position: absolute;
  top: -96px;
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
`;

const QuestionPassWrapper = styled.div``;
