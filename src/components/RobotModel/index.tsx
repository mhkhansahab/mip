import React from "react";
import styled from "styled-components";
import { imageRoute } from "../../utils/api";
import { ImageTypeInRobotPart, RobotPartType } from "../../utils/commonTypes";

type RobotModelPropsType = {
  robotParts: RobotPartType[];
  id: number | null;
};

const RobotModel = (props: RobotModelPropsType) => {
  const getImgSrc = (imgArr: ImageTypeInRobotPart[]) => {
    return imgArr.filter(img => img.type === "Layer").length
      ? imgArr.filter(img => img.type === "Layer")[0].key
      : "";
  };
  const getIndex = (imgArr: ImageTypeInRobotPart[]) => {
    return imgArr.filter(img => img.type === "Layer").length
      ? `${imgArr.filter(img => img.type === "Layer")[0].z_index}`
      : "";
  };

  return (
    <>
      {props.robotParts.map(part => (
        !part.isDisable && <React.Fragment key={part.id}>
          <RobotModelImage
            index={getIndex(part.images)}
            src={`${imageRoute}${getImgSrc(part.images)}`}
            alt=""
          />
          {!!part.images.filter(i => i.sub_position === "Right").length && (
            <RobotModelImage
              index={`${
                part.images.filter(i => i.sub_position === "Right")[0].z_index
              }`}
              src={`${imageRoute}${
                part.images
                  .filter(i => i.sub_position === "Right")
                  .filter(img => img.type === "Layer")[0].key
              }`}
              alt=""
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default RobotModel;

const RobotModelImage = styled.img<{ index: string }>`
  position: absolute;
  z-index: ${props => props.index};
`;
