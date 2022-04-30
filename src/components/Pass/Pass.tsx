import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/img/arrowLeftPass.svg";
import { ReactComponent as RightArrow } from "../../assets/img/arrowRightPass.svg";
import freeBGPass from "../../assets/img/freePassBGTittle.svg";
import freeIconPass from "../../assets/img/freePassIconTittle.svg";
import premBGPass from "../../assets/img/premPassBGTittle.svg";
import premIconPass from "../../assets/img/premPassIconTittle.svg";
import FreeKart from "./FreeKart/FreeKart";
import PremiumKart from "./PremiumKart/PremiumKart";

export function Pass() {
  return (
    <PassContainer>
      <LeavelWrapper>
        {/* <LeavelPass>
          <FreeKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"3"}
            lock={false}
          />
          <PremiumKart
            name="Head of Throns"
            lvl="1"
            descr="Skin"
            coin={"10"}
            lock={false}
          />
        </LeavelPass>

        <LeavelPass>
          <FreeKart lvl="1" name="1" descr="1" lock={false} />
          <PremiumKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"10"}
            lock={false}
          />
        </LeavelPass>

        <LeavelPass>
          <FreeKart lvl="1" name="1" descr="1" lock={false} />
          <PremiumKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"100"}
            lock={false}
          />
        </LeavelPass>

        <LeavelPass>
          <FreeKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"10"}
            lock={false}
          />
          <PremiumKartStyled
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"30"}
            lock={false}
          />
        </LeavelPass>

        <LeavelPass>
          <FreeKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"10"}
            lock={false}
          />
          <PremiumKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"50"}
            lock={false}
          />
        </LeavelPass>

        <LeavelPass>
          <FreeKart lvl="1" name="1" descr="1" lock={false} />
          <PremiumKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"20"}
            lock={false}
          />
        </LeavelPass>

        <LeavelPass>
          <FreeKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"1"}
            lock={false}
          />
          <PremiumKart
            name="Head of Thrones"
            lvl="1"
            descr="Skin"
            coin={"80"}
            lock={true}
          />
        </LeavelPass> */}

        <TitlePassWrapper>
          <FreePass>
            <h5>Free season pass</h5>
            <p>Lorem ipsum dolor</p>
            <img src={freeIconPass} alt="" />
          </FreePass>
          <PremPass>
            <h5>Premium season pass</h5>
            <p>Lorem ipsum dolor</p>
            <img src={premIconPass} alt="" />
          </PremPass>
        </TitlePassWrapper>

        <ArrowWrapper>
          <LeftAr />
          <RightAr />
        </ArrowWrapper>
      </LeavelWrapper>
    </PassContainer>
  );
}

const FreePass = styled.div`
  box-shadow: 31px 0px 28px 12px rgba(0, 0, 0, 0.52);
  background-image: url(${freeBGPass});
`;

const PremPass = styled.div`
  box-shadow: 31px 0px 28px 12px rgba(0, 0, 0, 0.52);
  background-image: url(${premBGPass});
`;

const LeavelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  align-items: center;
  width: 115%;
  height: 100%;
`;

const TitlePassWrapper = styled.div`
  position: absolute;
  left: -60px;

  > div {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 12px 0;
    width: 200px;
    height: 264px;
    border-radius: 12px;

    > img {
      height: 192px;
      margin-top: 11px;
    }

    > h5 {
      margin-top: 21px;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }

    > p {
      margin-top: 6px;
      font-size: 12px;
      line-height: 14px;
      color: #616d7a;
    }
  }
`;

const LeavelPass = styled.div`
  > div {
    margin: 10px 4px;
  }
`;

const PassContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  align-items: center;
  position: relative;
  height: 440px;
  margin-bottom: 100px;
`;

const RightAr = styled(RightArrow)`
  :hover {
    cursor: pointer;
  }
`;
const LeftAr = styled(LeftArrow)`
  :hover {
    cursor: pointer;
  }
`;

const PremiumKartStyled = styled(PremiumKart)`
  top: 295px;
`;
