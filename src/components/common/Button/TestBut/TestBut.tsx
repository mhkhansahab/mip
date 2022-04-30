import styled from "styled-components";

type PropsButton = {
  children: string;
  width: string;
  color: "yellow" | "blue" | "green" | "";
  size: "big" | "medium" | "small" | "modal" | "";
  active: boolean;
};

export default function TestBtn(props: PropsButton) {
  return (
    <Wrap>
      <div className="wrapper">
        <Abtn
          active={props.active}
          width={props.width}
          color={props.color}
          size={props.size}
          className="btn"
        >
          <span></span>
          <span></span>
          {props.children}
        </Abtn>
      </div>
    </Wrap>
  );
}

const Abtn = styled.a<{
  width: string;
  color: string;
  size: string;
  active: boolean;
}>`
  font-weight: bold;
  position: relative;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  border-radius: 2px;
  clip-path: polygon(
    0% 36%,
    13% 0%,
    100% 0%,
    100% 0%,
    100% 65%,
    87.5% 100%,
    0% 100%,
    0% 100%
  );

  width: ${props => props.width}px;

  ${props =>
    props.color === "yellow"
      ? `color: #6D3502; border: 1px solid #ffe74e;
      background: linear-gradient(180deg, #fff659 0%, #ff8d06 100%);`
      : props.color === "blue" && props.active
      ? `color: #FFFFFF; border: none;
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

  :hover {
    ${props =>
      props.color === "yellow"
        ? `color: #ffe74e; border: 1px solid #ffe74e;
            background: none;`
        : props.color === "blue" && props.active
        ? `color: #FFFFFF; border: 1px solid #FFFFFF;
            background: none;`
        : props.color === "blue"
        ? `color: #003752; border: 1px solid #003752;
            background: none;`
        : props.color === "green" && props.active
        ? `color: #00301B; border: 1px solid #00301B; 
            background: none;`
        : props.color === "green"
        ? `color: #25E79F; border: 1px solid #25E79F; 
            background: none`
        : ""};
  }

  ${({ size }) =>
    size === "big"
      ? `font-size: 18px; height: 60px;`
      : size === "medium"
      ? `font-size: 14px; height: 40px;`
      : size === "small"
      ? `font-size: 14px; height: 32px;`
      : size === "modal"
      ? `font-size: 14px; height: 48px;`
      : ""};
`;

const Wrap = styled.div`
  display: inline;
  .wrapper {
    display: inline;
    width: 100%;
    display: flex;
    align-items: center;

    .btn:before,
    .btn:after,
    .btn > span:nth-of-type(2):before,
    .btn > span:nth-of-type(2):after {
      content: "";
      position: absolute;
    }

    .btn:before,
    .btn:after {
      width: calc(100% - 12px);
      height: 1px;
      display: none;
    }

    .btn:before {
      top: 0;
      left: 12px;
      position: absolute;
    }

    .btn:after {
      bottom: 0;
      left: 0;
    }

    .btn > span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .btn > span:nth-of-type(2):before {
      height: 26px;
      width: 1px;
      -webkit-transform: rotate(54deg);
      transform: rotate(49deg);
    }

    .btn > span:nth-of-type(2):after {
      height: 26px;
      width: 1px;
      -webkit-transform: rotate(45deg);
      transform: rotate(49deg);
    }

    .btn > span:nth-of-type(2):before {
      top: -6.3px;
      left: 1.8px;
    }

    .btn > span:nth-of-type(2):after {
      bottom: -6.3px;
      right: 1.8px;
    }
  }
`;
