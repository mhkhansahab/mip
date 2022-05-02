import styled from "styled-components";
import loadable from '@loadable/component';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useHistory } from "react-router-dom";
import diamond from "../assets/img/smallDiamond.svg";
import garageHeaderBg from "../assets/img/backgroundGarage.png";
import titleRobot from "../assets/img/passBonusesRobot.png";
import { bonusMap, ProfileUserInfo } from "../utils/commonTypes";

const Bonus = loadable(() => import('../components/common/Bonus'));
const NewPass = loadable(() => import('../components/NewPass'));
const TedButton = loadable(() => import('../components/common/Button/TedButton'));

type SeasonpassPropsType = {
  profile: ProfileUserInfo;
};

const PassBonuses = (props: SeasonpassPropsType) => {
  const history = useHistory();
  const needExp = 100;

  return (
    <MainContainer>
      <LeftPass>
        {!props.profile.season_pass ? (
          <>
            {props.profile.robots
              .filter(robot => robot.status !== "NFT")
              .map(robot => (
                <PassWrapper key={robot.id}>
                  <TitlePass>
                    <p>{robot.name}</p>
                    <span>{robot.description}</span>
                    <ProgressLvl>
                      <Leavel>
                        <p>{props.profile.level}</p>
                      </Leavel>
                      <Progress>
                        <LineProgress
                          progress={(props.profile.balance_xp / needExp) * 100}
                        />
                      </Progress>
                    </ProgressLvl>
                    <h1>
                      {+props.profile.balance_xp}/{needExp} exp
                    </h1>
                    <LazyLoadImage
                      alt={''}
                      effect="blur"
                      src={titleRobot} />
                  </TitlePass>
                  <MainPass>
                    <NewPass lvl={+props.profile.level} type="free" />
                  </MainPass>
                </PassWrapper>
              ))}

            <PassWrapper relative={true}>
              <BlackBackgroundWithButton>
                <TedButton
                  color="green"
                  width="210"
                  size="big"
                  onclick={() => history.push("/seasonpass")}
                >
                  Buy now
                </TedButton>
              </BlackBackgroundWithButton>
              <TitlePass>
                <p>Head of Thrones</p>
                <span>Lorem ipsum dolor sit amet</span>
                <ProgressLvl>
                  <Leavel>
                    <p>{props.profile.level}</p>
                  </Leavel>
                  <Progress>
                    <LineProgress
                      progress={(props.profile.balance_xp / needExp) * 100}
                    />
                  </Progress>
                </ProgressLvl>
                <h1>
                  {+props.profile.balance_xp}/{needExp} exp
                </h1>
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={titleRobot} />
              </TitlePass>
              <MainPass>
                <NewPass lvl={+props.profile.level} type="free" />
              </MainPass>
            </PassWrapper>
          </>
        ) : (
          <PassWrapper>
            <TitlePass>
              <p>Head of Thrones</p>
              <span>Lorem ipsum dolor sit amet</span>
              <ProgressLvl>
                <Leavel>
                  <p>{props.profile.level}</p>
                </Leavel>
                <Progress>
                  <LineProgress
                    progress={(props.profile.balance_xp / needExp) * 100}
                  />
                </Progress>
              </ProgressLvl>
              <h1>
                {+props.profile.balance_xp}/{needExp} exp
              </h1>
              <LazyLoadImage
                alt={''}
                effect="blur"
                src={titleRobot} />
            </TitlePass>
            <MainPass>
              <NewPass lvl={+props.profile.level} type="prem" />
            </MainPass>
          </PassWrapper>
        )}
      </LeftPass>
      <RightBonus>
        {bonusMap.length !== 0 && (
          <BonusesWrapper>
            {bonusMap.map(item => (
              <Bonus
                key={`${item.nameBonus}${Math.random()}`}
                currentProg={item.currentProg}
                descrBonus={item.descrBonus}
                nameBonus={item.nameBonus}
                needProg={item.needProg}
                rewardCoin={item.rewardCoin}
              />
            ))}
            <TotalCoins>
              <p>Total bonus</p>
              <Diamonds>
                <span>180 MIP</span>
                <LazyLoadImage
                  alt={''}
                  effect="blur"
                  src={diamond} />
              </Diamonds>
            </TotalCoins>
          </BonusesWrapper>
        )}
        {bonusMap.length === 0 && (
          <NotItemsText>
            <div>
              So far, you have no bonuses. Upgrade your robots to get them
            </div>
          </NotItemsText>
        )}
      </RightBonus>
    </MainContainer>
  );
};

export default PassBonuses;

const Diamonds = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    color: #ffd63d;
    margin: 2px 6px 0 0;
  }
`;

const TotalCoins = styled.div`
  background: #0b1014;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 98px;
  padding: 0 20px;
  > p {
    font-size: 14px;
    line-height: 17px;
    color: #616d7a;
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

const BonusesWrapper = styled.div`
  margin: 40px 40px 0 0;

  > div {
    border-radius: 12px;
    margin: 0 20px 8px 20px;
    width: 388px;

    @media (max-width: 560px) {
      width: auto;
    }

    @media (max-width: 430px) {
      height: auto;
      flex-direction: column;
      margin: 15px 0;
      padding: 7px 0;
    }
  }

  > div:last-child {
    @media (max-width: 1440px) {
      width: 856px;
    }

    @media (max-width: 1090px) {
      width: auto;
    }
  }

  @media (max-width: 1440px) {
    display: flex;
    flex-wrap: wrap;
    margin: 55px 0 0 180px;
  }
  @media (max-width: 1350px) {
    margin: 55px 0 0 25px;
  }

  @media (max-width: 1090px) {
    flex-direction: column;
  }

  @media (max-width: 560px) {
    width: 90%;
    margin: 55px auto 0 auto;
  }
`;

const MainPass = styled.div``;

const LineProgress = styled.div<{
  progress: number;
}>`
  height: 6px;
  background: #29efa8;
  border-radius: 6px;
  margin-left: -3px;
  width: ${props => props.progress}%;
`;

const Progress = styled.div`
  height: 6px;
  z-index: 1;
  background: #1f2933;
  border-radius: 6px;
  width: 100px;
  position: relative;
`;

const Leavel = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  background: #29efa8;
  > p {
    font-size: 14px;
    margin-top: 4px;
    line-height: 17px;
    color: #00301b;
  }
`;

const ProgressLvl = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const PassWrapper = styled.div<{ relative?: boolean }>`
  display: flex;
  margin-top: 50px;
  align-items: center;
  position: ${props => props.relative && "relative"};

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const TitlePass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 226px;
  height: 300px;
  background: #0b1014;
  border-radius: 12px;
  color: #ffffff;

  > h1 {
    font-size: 12px;
    line-height: 14px;
    margin-top: 6px;
  }

  > p {
    font-size: 16px;
    line-height: 19px;
    margin: 20px 0 4px 0;
  }

  > span {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }

  > span > img {
    margin-top: 10px;
    border-radius: 12px;
  }
`;

const LeftPass = styled.div`
  margin-left: 25px;

  @media (max-width: 560px) {
    width: 100%;
    margin-left: 0;
  }
`;

const RightBonus = styled.div`
  @media (max-width: 560px) {
    width: 100%;
  }
`;

const MainContainer = styled.div`
  background-image: url(${garageHeaderBg});
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  flex-wrap: wrap;

  @media (max-width: 1440px) {
    flex-direction: column;
  }

  @media (max-width: 1090px) {
    align-items: flex-start;
  }
`;

const BlackBackgroundWithButton = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 12px;

  > div {
    display: none;
  }

  :hover {
    background: rgba(0, 0, 0, 0.8);

    > div {
      display: flex;
    }
  }
`;
