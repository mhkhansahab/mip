import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import borderActiveItem from "../../assets/img/landingActiveBorderGallery.svg";
import borderItem from "../../assets/img/landingBorderGallery.svg";
import imgGalery from "../../assets/img/landingImgGallery.png";

type PropsGalleryType = {
  activeGallery?: boolean;
};

export default function LandingItemGallery(props: PropsGalleryType) {
  return (
    <ItemGalleryWrapper active={props.activeGallery}>
       <LazyLoadImage
            alt={''}
            effect="blur"
            src={imgGalery} />
    </ItemGalleryWrapper>
  );
}

const ItemGalleryWrapper = styled.div<{
  active?: boolean;
}>`
  position: relative;

  ${props =>
    props.active
      ? `background-image: url(${borderActiveItem});
      width: 455px; height: 456px; margin-bottom: 35px;

      @media (max-width: 1870px) {
        width: 425px; height: 435px;
      }
      @media (max-width: 1730px) {
        width: 405px; height: 405px;
      }
      @media (max-width: 1630px) {
        width: 375px; height: 375px;
      }
      @media (max-width: 1450px) {
        width: 335px; height: 335px;
      }
      @media (max-width: 1280px) {
        width: 400px; height: 360px;
      }
      @media (max-width: 1280px) {
        width: 370px; height: 330px;
      }
      @media (max-width: 1024px) {
        width: 320px; height: 280px;
      }
      @media (max-width: 820px) {
        width: 360px; height: 320px;
      }
      @media (max-width: 480px) {
        width: 268px; height: 260px;
      }`
      : `background-image: url(${borderItem});
      width: 351px; height: 368px; opacity: 0.5;

      @media (max-width: 1870px) {
        width: 325px; height: 335px;
      }
      @media (max-width: 1730px) {
        width: 305px; height: 315px;
      }
      @media (max-width: 1630px) {
        width: 275px; height: 285px;
      }
      @media (max-width: 1450px) {
        width: 245px; height: 255px;
      }
      @media (max-width: 1280px) {
        width: 340px; height: 300px;
      }
      @media (max-width: 1280px) {
        width: 310px; height: 270px;
      }
      @media (max-width: 1024px) {
        width: 260px; height: 220px;
      }`};

  > span > img {
    position: absolute;
    border-radius: 4px;

    ${props =>
      props.active
        ? `width: 414px; height: 412px;
        top: 44px; left: 41px;

        @media (max-width: 1870px) {
          width: 395px; height: 390px;
        }
        @media (max-width: 1730px) {
          width: 375px; height: 370px;
        }
        @media (max-width: 1630px) {
          width: 345px; height: 340px;
        }
        @media (max-width: 1450px) {
          width: 315px; height: 310px;
        }
        @media (max-width: 1280px) {
          width: 360px; height: 350px;
        }
        @media (max-width: 1130px) {
          width: 330px; height: 320px;
        }
        @media (max-width: 1024px) {
          width: 280px; height: 270px;
        }
        @media (max-width: 820px) {
          width: 320px; height: 310px;
        }
        @media (max-width: 480px) {
          width: 230px; height: 230px;
        }`
        : `width: 313px; height: 335px;
        top: 16px; left: 39px;
        border-top-right-radius: 0px;

        @media (max-width: 1870px) {
          width: 290px; height: 310px;
        }
        @media (max-width: 1730px) {
          width: 270px; height: 290px;
        }
        @media (max-width: 1630px) {
          width: 240px; height: 260px;
        }
        @media (max-width: 1450px) {
          width: 210px; height: 225px;
        }
        @media (max-width: 1280px) {
          width: 300px; height: 300px;
        }
        @media (max-width: 1130px) {
          width: 270px; height: 270px;
        }
        @media (max-width: 1024px) {
          width: 220px; height: 220px;
        }
        `};
  }
`;
