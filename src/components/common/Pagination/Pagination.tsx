import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as PaginationIcon } from "../../../assets/img/paginationArrow.svg";

type PaginationPropsType = {
  pageNumber: string;
  itemsCount: number;
  itemsPerPage: number;
};

export const Pagination = (props: PaginationPropsType) => {
  const history = useHistory();
  const maxCount = Math.ceil(props.itemsCount / props.itemsPerPage);

  const plusDisabled = +props.pageNumber >= maxCount;
  const decDisabled = +props.pageNumber <= 1;

  const plusPage = () => {
    !plusDisabled && history.push(`${+props.pageNumber + 1}`);
  };

  const decPage = () => {
    !decDisabled && history.push(`${+props.pageNumber - 1}`);
  };

  return (
    <PaginationContent>
      <PaginationArrowLeft onClick={decPage} disabled={decDisabled} />
      {props.pageNumber !== "1" && (
        <>
          <ExtraPageNumber onClick={() => history.push("1")}>1</ExtraPageNumber>
          <DotsSpan>...</DotsSpan>
        </>
      )}
      <PageNumber>{props.pageNumber}</PageNumber>
      {+props.pageNumber !== maxCount && (
        <>
          <DotsSpan>...</DotsSpan>
          <ExtraPageNumber onClick={() => history.push(`${maxCount}`)}>
            {maxCount}
          </ExtraPageNumber>
        </>
      )}
      <PaginationArrowRight onClick={plusPage} disabled={plusDisabled} />
    </PaginationContent>
  );
};

const PaginationContent = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationArrowLeft = styled(PaginationIcon)<{ disabled: boolean }>`
  fill: #616d7a;

  :hover {
    fill: #29efa8;
    cursor: pointer;
  }

  ${props =>
    props.disabled &&
    `
  :hover {
    fill: #616d7a;
    cursor: not-allowed;
  }
  `}
`;

const PaginationArrowRight = styled(PaginationIcon)<{ disabled: boolean }>`
  fill: #616d7a;
  transform: rotate(180deg);

  :hover {
    fill: #29efa8;
    cursor: pointer;
  }

  ${props =>
    props.disabled &&
    `
  :hover {
    fill: #616d7a;
    cursor: not-allowed;
  }
  `}
`;

const PageNumber = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
  padding: 12px 16px;
  border: 2px solid #29efa8;
  border-radius: 6px;
  margin: 0 40px;
`;

const ExtraPageNumber = styled(PageNumber)`
  border: 2px solid rgba(0, 0, 0, 0);
  color: #616d7a;

  :hover {
    cursor: pointer;
    border: 2px solid #29efa8;
    color: #fff;
  }
`;

const DotsSpan = styled.span``;
