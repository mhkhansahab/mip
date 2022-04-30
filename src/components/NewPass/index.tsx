import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FreeKart from "../Pass/FreeKart/FreeKart";
import PremiumKart from "../Pass/PremiumKart/PremiumKart";
import { useGetSeasonPass } from "../../hooks/useGetSeasonPass";
import {
  SlickArrowLeftNewPass,
  SlickArrowRightNewPass,
} from "../common/SlickArrow/SlickArrow";

type PropsPassType = {
  lvl: number;
  type: "prem" | "free";
};

const NewPass = (props: PropsPassType) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 910,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const { data: seasonPassData } = useGetSeasonPass();

  return (
    <>
      {props.type === "free" && (
        <SliderWrapp
          {...settings}
          prevArrow={<SlickArrowLeftNewPass />}
          nextArrow={<SlickArrowRightNewPass />}
        >
          {seasonPassData?.data &&
            seasonPassData.data.map(item => (
              <React.Fragment key={item.level}>
                <FreeKart
                  src={
                    item.free_pass.loots?.length
                      ? item.free_pass.loots[0].images[0].key
                      : ""
                    //false ? item.free_pass.loots[0].images[0].key :  ""
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
                  robot={!!item.free_pass.loots}
                  key={`${item.nextXp}${Math.random()}`}
                />
                <LvLPass>
                  <PrefLine active={props.lvl >= item.level}></PrefLine>
                  <LvlItem>
                    {item.level}{" "}
                    <Circle active={props.lvl < item.level}></Circle>
                  </LvlItem>
                  <BeforeLine active={props.lvl > item.level}></BeforeLine>
                </LvLPass>
              </React.Fragment>
            ))}
        </SliderWrapp>
      )}

      {props.type === "prem" && (
        <SliderWrapp
          {...settings}
          prevArrow={<SlickArrowLeftNewPass />}
          nextArrow={<SlickArrowRightNewPass />}
        >
          {seasonPassData?.data &&
            seasonPassData.data.map(item => (
              <React.Fragment key={item.level}>
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
                  name={item.premium_pass.tokens ? "" : item.premium_pass.tier}
                  coin={item.premium_pass.tokens || null}
                  robot={!!item.premium_pass.loots}
                  active={props.lvl === item.level}
                  key={`${item.nextXp}${Math.random()}`}
                />
                <LvLPass curLvl={item.level === props.lvl}>
                  <PrefLine active={props.lvl >= item.level}></PrefLine>
                  <LvlItem>
                    {item.level}{" "}
                    <Circle active={props.lvl < item.level}></Circle>
                  </LvlItem>
                  <BeforeLine active={props.lvl > item.level}></BeforeLine>
                </LvLPass>
              </React.Fragment>
            ))}
        </SliderWrapp>
      )}
    </>
  );
};

export default NewPass;

const PrefLine = styled.div<{
  active: boolean;
}>`
  background:${props => (props.active ? `#29efa8;` : `#25313d;`)} 
  height: 4px;
  width: 100%;
  @media(max-width: 1440px) {
    width: 82%;
  }
  @media(max-width: 1280px) {
    width: 62%;
  }
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
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
  margin: 0 10px;
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

const LvLPass = styled.div<{
  curLvl?: boolean;
}>`
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => (props.curLvl ? `-12px` : `10px`)};
`;

const SliderWrapp = styled(Slider)`
  width: 900px;
  margin-left: 60px;

  @media (max-width: 1440px) {
    width: 915px;
    overflow-hidden;
  }

  @media (max-width: 1350px){
    width: 660px;
  }

  @media (max-width: 1090px){
    width: 470px;
  }

  @media (max-width: 910px){
    width: 240px;
  }

  @media (max-width: 560px){
    margin-left:0;
  }

 

  > div {
    margin: 0 20px;
    > div {
      > div:nth-child(1) {
        > div:nth-child(1) {
          > div:nth-child(2) {
            > div:nth-child(1) {
              //display: none;
              background: none;
            }
          }
        }
      }
    }
    > div {
      > div:last-child {
        > div:nth-child(1) {
          > div:nth-child(2) {
            > div:nth-child(3) {
              //display: none;
              background: none;
            }
          }
        }
      }
    }
  }
`;
