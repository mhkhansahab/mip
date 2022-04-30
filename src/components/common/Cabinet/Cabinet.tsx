import { useState } from "react";
import styled from "styled-components";
import photo from "../../../assets/img/photo.png";
import box from "../../../assets/img/smallBox.svg";
import diamond from "../../../assets/img/smallDiamond.svg";
import send from "../../../assets/img/smallSend.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/img/logout.svg";
import { useHistory } from "react-router-dom";
import { ProfileUserInfo } from "../../../utils/commonTypes";

type PropsCabinet = {
  profileData?: ProfileUserInfo;
  countCase: number;
  mobile?: boolean;
};

export const Cabinet = (props: PropsCabinet) => {
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.go(0);
  };
  return (
    <CabinetWrapper>
      {(open || props.mobile) && (
        <FullCabinetInfo>
          <Image onClick={() => setOpen(false)} src={photo} />
          <MiddleCabinetInfo>
            <Wallet>
              {props.profileData?.wallet
                ? `${props.profileData.wallet.split("").slice(0, 10).join("")}...`
                : "No wallet"}
            </Wallet>
            <InnerInfo>
              <Boxes>
                <img src={box} alt="" />
                <span>{props.countCase}</span>
              </Boxes>
              <Diamonds>
                <img src={diamond} alt="" />
                <span>{props.profileData?.balance || 0} MIP</span>
              </Diamonds>
              <img src={send} alt="" />
            </InnerInfo>
          </MiddleCabinetInfo>
          <LogoutIconStyled onClick={handleLogout} />
        </FullCabinetInfo>
      )}
      <Photo onClick={() => setOpen(true)}>
        <ClosedCabinetPhoto src={photo} />
      </Photo>
    </CabinetWrapper>
  );
};

const CabinetWrapper = styled.div`
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  display: flex;
  align-items: center;

  @media (max-width: 700px) {
    margin-bottom: 15px;
  }
`;

const FullCabinetInfo = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  box-sizing: border-box;
  width: 340px;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);

  @media (max-width: 700px) {
    position: static;
    background: none;
    border: 1px solid #fff;
    border-radius: 15px;
    width: auto;
    padding: 12px;
  }
`;

const Image = styled.img`
  margin-right: 11px;
  cursor: pointer;
`;

const MiddleCabinetInfo = styled.div``;

const Wallet = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const InnerInfo = styled.div`
  display: flex;
`;

const Boxes = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    color: #ffffff;
    margin: 4px 0 0 6px;
  }
`;

const Diamonds = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    color: #ffffff;
    margin-left: 6px;
  }
`;

const LogoutIconStyled = styled(LogoutIcon)`
  margin-left: 20px;
  fill: #283542;
  cursor: pointer;

  :hover {
    fill: #fff;
  }

  @media (max-width: 700px) {
    fill: #fff;

    :hover {
      fill: #29efa8;
    }
  }
`;

const Photo = styled.div`
  height: 100%;
  padding: 18px 32px;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 700px) {
    display: none;
  }
`;

const ClosedCabinetPhoto = styled.img``;
