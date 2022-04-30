import styled from "styled-components";
import footerUserImg from "../../assets/img/footerUser.svg";
import footerCardImg from "../../assets/img/footerCard.svg";
import footerHeartImg from "../../assets/img/footerHeart.svg";
import { ReactComponent as FooterVk } from "../../assets/img/footerVk.svg";
import { ReactComponent as FooterYoutube } from "../../assets/img/footerYoutube.svg";
import { ReactComponent as FooterTelega } from "../../assets/img/footerTelega.svg";
import { ReactComponent as FooterFacebook } from "../../assets/img/footerFacebook.svg";
import { ReactComponent as FooterInsta } from "../../assets/img/footerInsta.svg";

const Footer = () => {
  return (
    <FooterWrapper>
      <LeftFooter>
        <CountLine>
          <CountItem>
            <img src={footerUserImg} alt="" />
            <div>
              <h3>674 215</h3>
              <p>Amount of users</p>
            </div>
          </CountItem>
          <CountItem>
            <img src={footerCardImg} alt="" />
            <div>
              <h3>674 215</h3>
              <p>Amount of users</p>
            </div>
          </CountItem>
          <CountItem>
            <img src={footerHeartImg} alt="" />
            <div>
              <h3>674 215</h3>
              <p>Amount of users</p>
            </div>
          </CountItem>
        </CountLine>
        <LeftFooterDescr>
          Nor again is there anyone who loves or pursues or desires to obtain
          pain of itself, because it is pain, but because occasionally
          circumstances occur in which toil and pain can procure him some great
          pleasure. To take a trivial example, which of us ever undertakes
        </LeftFooterDescr>
      </LeftFooter>
      <RightFooter>
        <RightFooterIcons>
          <IconYoutube />
          <IconVk />
          <IconInsta />
          <IconTelega />
          <IconFacebook />
        </RightFooterIcons>
        <RightFooterDescr>
          ITSFAIL LTD: Company number 13246765, 16 John Nicholas Crescent,
          Ellesmere Port, Cheshire, United Kingdom, CH65 2DL, +44 07308278693.
        </RightFooterDescr>
      </RightFooter>
    </FooterWrapper>
  );
};

export default Footer;

const IconYoutube = styled(FooterYoutube)``;
const IconVk = styled(FooterVk)``;
const IconInsta = styled(FooterInsta)``;
const IconTelega = styled(FooterTelega)``;
const IconFacebook = styled(FooterFacebook)``;

const FooterWrapper = styled.div`
  height: 170px;
  background: #0b1014;
  width: calc(100% - 90px);
  margin-left: 90px;
  box-sizing: border-box;
  padding: 36px 48px 33px 48px;
  display: flex;

  @media (max-width: 1280px) {
    height: auto;
  }

  @media (max-width: 1135px) {
    flex-direction: column;
  }

  @media (max-width: 700px) {
    width: 100%;
    margin-left: 0;
  }
`;

const LeftFooter = styled.div`
  width: 60%;
  cursor: context-menu;

  @media (max-width: 1135px) {
    width: 100%;
  }
`;

const CountLine = styled.div`
  display: flex;

  @media (max-width: 1135px) {
    flex-wrap: wrap;
  }

  @media (max-width: 800px) {
    align-items: center;
    flex-direction: column;
  }
`;

const CountItem = styled.div`
  margin-right: 48px;
  display: flex;
  align-items: center;

  img {
    margin-right: 16px;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
  }

  p {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
    margin-top: 4px;
  }

  @media (max-width: 1135px) {
    margin-bottom: 15px;
  }
`;

const LeftFooterDescr = styled.p`
  margin-top: 19px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #1f2933;
  max-width: 921px;
`;

const RightFooter = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 1135px) {
    width: 100%;
    align-items: center;
  }
`;

const RightFooterIcons = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-left: 12px;
    cursor: pointer;
    fill: #25313d;

    :hover {
      fill: #fff;
    }
  }

  @media (max-width: 1135px) {
    margin-top: 15px;
  }
`;

const RightFooterDescr = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #616d7a;
  max-width: 450px;
  margin-top: 23px;
  cursor: context-menu;

  @media (max-width: 1135px) {
    margin-top: 15px;
    text-align: center;
  }
`;
