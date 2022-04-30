import { ReactElement } from "react";
import styled from "styled-components";
import confirmedAccept from "../../../../assets/img/confirmV.svg";
import CustomLoader from "../../Loader";

type PropsButton = {
  children: string | ReactElement<any, any>;
  width: string;
  color: "yellow" | "blue" | "green";
  size: "big" | "medium" | "small" | "modal";
  active?: boolean;
  refresh?: boolean;
  onclick: () => void;
  type?: "submit";
  disabled?: boolean;
  loading?: boolean;
};

const TedButton = (props: PropsButton) => {
  return (
    <ButtonWrapper>
      <Button
        disabled={props.disabled}
        type={props.type}
        onClick={props.onclick}
        active={props.active}
        width={props.width}
        color={props.color}
        size={props.size}
        refresh={props.refresh}
      >
        {props.children === "Confirmed" && <img src={confirmedAccept} alt="" />}
        {props.loading ? <CustomLoader size={40} margin="0" /> : props.children}
      </Button>
    </ButtonWrapper>
  );
};

export default TedButton;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{
  width: string;
  color?: string;
  size?: string;
  active?: boolean;
  refresh?: boolean;
  disabled?: boolean;
}>`
  box-sizing: border-box;
  border-radius: 6px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  line-height: 22px;
  text-align: center;
  ${props =>
    props.disabled ? `opacity: 0.5; cursor: no-drop !important;` : ""}

  width: ${props => (props.width === "100%" ? "100%" : `${props.width}px`)};

  ${props =>
    props.size === "big" && props.refresh
      ? `font-size: 18px; height: 60px;
      clip-path: polygon(19% 0, 100% 0, 100% 72%, 81% 100%, 0 100%, 0 29%);`
      : props.size === "big" && props.width > "300"
      ? `font-size: 18px; height: 60px;
      clip-path: polygon(5% 0, 100% 0, 100% 72%, 95% 100%, 0 100%, 0 29%);`
      : props.size === "big"
      ? `font-size: 18px; height: 60px;
      clip-path: polygon(7% 0, 100% 0, 100% 72%, 93% 100%, 0 100%, 0 29%);`
      : props.size === "medium"
      ? `font-size: 14px; height: 40px;
      clip-path: polygon(7% 0, 100% 0, 100% 72%, 93% 100%, 0 100%, 0 29%);`
      : props.size === "small" && props.refresh
      ? `font-size: 14px; height: 32px;
      clip-path: polygon(23% 0, 100% 0, 100% 72%, 77% 100%, 0 100%, 0 29%);`
      : props.size === "small"
      ? `font-size: 14px; height: 32px;
      clip-path: polygon(7% 0, 100% 0, 100% 72%, 93% 100%, 0 100%, 0 29%);`
      : props.size === "modal"
      ? `font-size: 14px; height: 48px;
      clip-path: polygon(5% 0, 100% 0, 100% 72%, 95% 100%, 0 100%, 0 29%)`
      : ""};

  ${props =>
    props.color === "yellow"
      ? `color: #6D3502; border: 1px solid #ffe74e;
      background: linear-gradient(180deg, #fff659 0%, #ff8d06 100%);`
      : props.color === "blue" && props.active
      ? `color: #fff; border: none;
      background: linear-gradient(180deg, #0CC7EF -5.47%, #0A80D1 79.16%);`
      : props.color === "blue"
      ? `color: #003752; border: none;
      background: linear-gradient(180deg, #0CC7EF -5.47%, #0A80D1 79.16%);`
      : props.color === "green" && props.active
      ? `color: #29EFA8; border: 1px solid #00301B; 
      background: #00301B;`
      : props.color === "green"
      ? `color: #00301B; border: 1px solid #25E79F; 
      background: linear-gradient(180deg, #29EFA8 20%, #00A355 100%);`
      : ""};

  > div {
    ${props => (props.active ? `background: #fff;` : `background: #00301B;`)};
  }

  :hover {
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  }

  > img {
    margin: -2px 6px;
  }
`;
