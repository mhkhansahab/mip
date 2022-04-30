import { NavLink } from "react-router-dom";
import styled from "styled-components";
import pass from "../../../assets/img/pass.png";

export default function Ticket() {
  return (
    <NavLink to="/seasonpass">
      <Wrapper>
        <Img>
          <img src={pass} alt="" />
        </Img>
        <WrapPass>
          <AboutPass>
            <h5>Season pass</h5>
            <p>But I must explain to you how all</p>
            <span>Buy now</span>
          </AboutPass>
        </WrapPass>
      </Wrapper>
    </NavLink>
  );
}

const Wrapper = styled.div`
  cursor: pointer;
  height: 90px;
  display: flex;
  align-items: center;
  background: #0b1014;
  width: 250px;

  @media (max-width: 1280px) {
    margin-right: 10px;
  }
`;

const Img = styled.div`
  margin-right: 11px;
  img {
    height: 54px;
  }
`;

const WrapPass = styled.div``;

const AboutPass = styled.div`
  h5 {
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }
  p {
    color: #616d7a;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    margin: 4px 0;
  }
  span {
    background: linear-gradient(45deg, #ff8d06 50%, #fff659 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #0b2349;
    display: table;
    font-size: 14px;
    line-height: 17px;

    ::after {
      content: "  >";
      font-size: 18px;
    }
  }
`;
