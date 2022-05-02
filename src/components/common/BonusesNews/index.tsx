import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import bookItem from "../../../assets/img/bonusesBookItem.svg";
import gameItem from "../../../assets/img/bonusesGameIcon.svg";
import userItem from "../../../assets/img/bonusesUserIcon.svg";
import Modal from "../Modal";

type PropsNewsType = {
  title: string;
  text: string;
  type: "game" | "book" | "user" | string;
};

export default function BonusesNews(props: PropsNewsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const onClick = (e: any) =>
        ref.current?.contains(e.target) || setIsOpen(false);
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }
  }, [isOpen]);

  return (
    <NewsWrapper onClick={() => setIsOpen(!isOpen)} ref={ref}>
      {props.type === "user" ? (
        <LazyLoadImage
          alt={''}
          effect="blur"
          src={userItem} />
      ) : props.type === "book" ? (
        <LazyLoadImage
          alt={''}
          effect="blur"
          src={bookItem} />
      ) : (
        <LazyLoadImage
          alt={''}
          effect="blur"
          src={gameItem
          } />
      )}

      <TextNews>
        <h3>{props.title}</h3>
        <p>{`${props.text.split("").slice(0, 70).join("")}...`}</p>
        <SwapText>Learn more...</SwapText>
      </TextNews>
      <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
        <ModalWrapper>
          <LeftIcon>
            {props.type === "user" ? (
              <LazyLoadImage
                alt={''}
                effect="blur"
                src={userItem} />
            ) : props.type === "book" ? (
              <LazyLoadImage
                alt={''}
                effect="blur"
                src={bookItem} />
            ) : (
              <LazyLoadImage
                alt={''}
                effect="blur"
                src={gameItem
                } />
            )}
          </LeftIcon>
          <RightText>
            <div>
              <h3>{props.title}</h3>
              <p>{props.text}</p>
            </div>
          </RightText>
        </ModalWrapper>
      </Modal>
    </NewsWrapper>
  );
}

const SwapText = styled.span`
  margin-top: 4px;
  font-size: 14px;
  line-height: 17px;
  color: #616d7a;
  display: none;

  @media (max-width: 1440px) {
    display: block;
  }
`;

const LeftIcon = styled.div`
  width: 29%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightText = styled.div`
  width: 70%;
  margin: 0 auto;
  text-align: center;

  > div {
    width: 80%;

    > h3 {
      margin: 30px 0;
      font-size: 22px;
    }

    > p {
      line-height: 22px;
      letter-spacing: 0.8px;
    }
  }
`;

const ModalWrapper = styled.div`
  min-height: 300px;
  width: 590px;
  color: white;
  display: flex;
`;

const TextNews = styled.div`
  margin: 0 12px 0 54px;
  @media (max-width: 1366px) {
    display: none;
  }

  > h3 {
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  > p {
    margin-top: 4px;
    font-size: 14px;
    line-height: 17px;
    color: #616d7a;
    @media (max-width: 1440px) {
      display: none;
    }
  }
`;

const NewsWrapper = styled.div`
  margin-top: 30px;
  padding-bottom: 30px;
  position: relative;
  width: 345px;
  display: flex;
  border-bottom: 1px solid #25313d;
  @media (max-width: 1440px) {
    width: 160px;
  }

  @media (max-width: 1366px) {
    width: 42px;
    height: 20px;
    margin-left: 14px;
  }
  @media (max-width: 1280px) {
    margin-left: 10px;
  }

  > span > img {
    position: absolute;
  }
  :hover {
    cursor: pointer;
    > span > img {
      transform: scale(1.2, 1.2);
    }
    > div > p {
      text-decoration: underline;
    }
    > div > h3 {
      font-size: 17px;
    }
  }
`;
