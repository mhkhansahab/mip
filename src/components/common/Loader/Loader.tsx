import { RingLoader } from "react-spinners";
import styled from "styled-components";

type CustomLoaderProps = {
  margin?: string;
  height?: string;
  width?: string;
  selectMip?: boolean;
  color?: string;
  size?: number;
};

export const CustomLoader = (props: CustomLoaderProps) => {
  return (
    <LoadWrapper
      margin={props.margin}
      height={props.height}
      width={props.width}
      selectMip={props.selectMip}
    >
      <RingLoader size={props.size || 60} color={props.color || "#25E79F"} />
    </LoadWrapper>
  );
};

const LoadWrapper = styled.div<{
  margin?: string;
  height?: string;
  width?: string;
  selectMip?: boolean;
}>`
  width: ${props => props.width || "100px"};
  height: ${props => props.height || "100px"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin || 0};
  background: none !important;

  > span {
  }
`;
