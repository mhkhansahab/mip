import { CustomArrowProps } from "react-slick";
import styled from "styled-components";
import { ReactComponent as BonArrow } from "../../../assets/img/bonusesArrow.svg";

export const SlickArrowLeftNewPass = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => <PrevBtnNewPss {...props} />;

export const SlickArrowRightNewPass = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => <NextBtnNewPass {...props} />;

export const SlickArrowLeftProfile = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => <PrevBtnProfile {...props} />;

export const SlickArrowRightProfile = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => <NextBtnProfile {...props} />;

const PrevBtnNewPss = styled(BonArrow)`
  transform: matrix(-1, 0, 0, 1, 0, 0);
  fill: #616d7a;

  :hover {
    fill: #fff;
  }
`;

const NextBtnNewPass = styled(BonArrow)`
  fill: #616d7a;

  :hover {
    fill: #fff;
  }
`;

const PrevBtnProfile = styled(BonArrow)`
  transform: matrix(-1, 0, 0, 1, 0, 0);
  fill: #616d7a;
  left: 21px;
  z-index: 1;

  :hover {
    fill: #fff;
  }
`;

const NextBtnProfile = styled(BonArrow)`
  fill: #616d7a;
  right: 20px;
  top: 55%;
  @media (max-width: 1440px) {
    right: 185px;
  }
  @media (max-width: 1366px) {
    right: 195px;
  }
  @media (max-width: 1280px) {
    right: 280px;
  }

  :hover {
    fill: #fff;
  }
`;
