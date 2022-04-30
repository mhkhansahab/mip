import { useEffect } from "react";
import styled from "styled-components";
import checkImg from "../../../assets/img/correct.png";
import errorImg from "../../../assets/img/error.png";

type SnackBarPropsType = {
  text: string;
  onClose: () => void;
};

export const SnackBar = (props: SnackBarPropsType) => {
  const timer = setTimeout(() => {
    props.onClose();
  }, 2000);

  const error = props.text.includes("Error") || props.text.includes("error");

  useEffect(() => {
    return clearTimeout(timer);
  }, [timer]);

  return (
    <Snack error={error}>
      <span>{props.text}</span>
      <img src={error ? errorImg : checkImg} onClick={props.onClose} alt="" />
    </Snack>
  );
};

const Snack = styled.div<{ error: boolean }>`
  background: #151b24;
  border-radius: 10px;
  min-width: 350px;
  min-height: 40px;
  padding: 10px 20px;
  position: fixed;
  bottom: 50px;
  left: 50px;
  z-index: 9999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${props => (props.error ? "1px solid #ff0000" : "1px solid #29efa8")};

  span {
    color: #fff;
    font-size: 16px;
  }

  img {
    width: 25px;
    margin-left: 30px;

    :hover {
      cursor: pointer;
    }
  }
`;
