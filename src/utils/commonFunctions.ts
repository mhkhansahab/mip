import React from "react";
import { StylesConfig } from "react-select";
import { SparePartParams } from "./commonTypes";

export const Context = React.createContext<{
  setMessage: (mes: string) => void;
} | null>(null);

export const isDevelopmentBuild = () => {
  return process.env.REACT_APP_API_ROUTE === "/dev";
};

export const customStylesForGarageSelect: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: "#fff",
    padding: "15px 12px",
    background: "#161D24",
    "&:hover": { background: "#1C252E", cursor: "pointer" },
  }),
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    background: "#161D24",
    height: 46,
    borderRadius: 6,
    border: "none",
    outline: state.menuIsOpen ? "1px solid green" : "none",
    fontSize: 14,
    color: "#fff",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: "#fff" };
  },
  menuList: provided => ({
    ...provided,
    background: "#161D24",
  }),
  input: provided => ({
    ...provided,
    color: "#fff",
  }),
  menu: provided => ({
    ...provided,
    zIndex: 2,
  }),
};

export const customStylesForSettingsSelect: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: "#fff",
    padding: "15px 12px",
    background: "#161D24",
    "&:hover": { background: "#1C252E", cursor: "pointer" },
  }),
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    background: "#161D24",
    height: 46,
    borderRadius: 6,
    border: "none",
    outline: state.menuIsOpen ? "1px solid green" : "none",
    fontSize: 14,
    color: "#fff",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: "#fff" };
  },
  menuList: provided => ({
    ...provided,
    background: "#161D24",
  }),
  input: provided => ({
    ...provided,
    color: "#fff",
  }),
  menu: provided => ({
    ...provided,
    zIndex: 10,
  }),
  valueContainer: provided => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    marginTop: 4,
  }),
};

export const checkSingleParamInSparePart = (
  param: string,
  partParams: SparePartParams[],
) => {
  const needPart = partParams?.filter(part => part.trait === param);
  return needPart.length ? needPart[0].value : "None";
};

export const checkImageSrc = (
  imgArr: { key: string; type: "Thumbnail_Layer" | "Layer" }[],
  type: "Thumbnail_Layer" | "Layer",
) => {
  const needImgSrc = imgArr.filter(img => img.type === type);
  return needImgSrc.length ? needImgSrc[0].key : "";
};

export const checkTier = (paramsArr: SparePartParams[]) => {
  if (!paramsArr) {
    return "";
  }
  const resultObj = paramsArr.filter(item => item.trait === "sub_faction");
  return resultObj.length ? resultObj[0].value : "";
};

export const checkTrait = (paramsArr: SparePartParams[]) => {
  const resultObj = paramsArr.filter(item => item.trait === "part");
  return resultObj.length ? resultObj[0].value : "";
};
