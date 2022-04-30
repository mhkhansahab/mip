import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { ModalAdminAddDetail } from "../common/Modals/ModalAdminAddDetail";
import { useAdminGetOneBoxLoot } from "../../hooks/useAdminGetOneBoxLoot";
import CustomLoader from "../common/Loader";
import { useAdminPutManipylationDetail } from "../../hooks/useAdminPutManipylationDetail";
import {
  formDataType,
  useAdminPostUploadBoxImg,
} from "../../hooks/useAdminPostUploadBoxImg";
import { imageRoute } from "../../utils/api";
import Modal from "../common/Modal";
import TedButton from "../common/Button/TedButton";
import { useAdminGetAllImageLootBoxes } from "../../hooks/useAdminGetAllImageLootBoxes";
import { useAdminPutAddImageLootBox } from "../../hooks/useAdminPutAddImageLootBox";
import { checkImageSrc } from "../../utils/commonFunctions";

const AdminEditCase = () => {
  const [files, setFiles] = useState<[] | formDataType>([]);
  const { data: galleryLootBox, isLoading } = useAdminGetAllImageLootBoxes();

  const history = useHistory();

  const params = useParams<{ caseId: string; pageId: string }>();
  const { mutate: uploadImages } = useAdminPostUploadBoxImg();

  const { data: oneCaseData, isLoading: loadingOneCase } =
    useAdminGetOneBoxLoot(+params.caseId);

  const { mutate: manipulateWithBtn } = useAdminPutManipylationDetail();
  const { mutate: addImgLootBoxBtn } = useAdminPutAddImageLootBox();

  const [visibleAddDetail, setVisibleAddDetail] = useState<boolean>(false);
  const [visibleAddImage, setVisibleAddImage] = useState<boolean>(false);

  const arrImgId = oneCaseData?.data.images.map(item => item.id) || [0];

  const [activeCaseImg, setActiveCaseImg] = useState<number[]>(arrImgId);

  const oneCase = oneCaseData?.data;
  const detailsCase = oneCaseData?.data.parts;

  const deleteDetail = (idDetail: number) => {
    const deleteDataDetails = {
      boxId: +params.caseId,
      updateData: {
        mainInfo: {
          name: oneCaseData?.data.name || "",
          loot_tokens: Number(oneCaseData?.data.loot_tokens) || 0,
          price: oneCaseData?.data.price || 0,
          rarity: oneCaseData?.data.rarity || "Gray",
          active_status: Boolean(oneCaseData?.data.active_status) || false,
        },
        updatePart:
          oneCaseData?.data.parts
            .filter(item => item.id !== idDetail)
            .map(i => i.id) || [],
      },
    };

    manipulateWithBtn(deleteDataDetails);
  };

  const uploadImgFile = (e: any) => {
    setFiles(e.currentTarget.files);
  };

  const uploadImage = () => {
    const formData = new FormData();
    //@ts-ignore
    formData.append("lootbox", files[0]);
    uploadImages(formData);
  };

  const confirmImageLootBox = () => {
    addImgLootBoxBtn({
      boxId: +params.caseId,
      updateData: {
        updateImages: activeCaseImg,
        mainInfo: {
          name: oneCaseData?.data.name || "",
          loot_tokens: Number(oneCaseData?.data.loot_tokens) || 0,
          price: oneCaseData?.data.price || 0,
          rarity: oneCaseData?.data.rarity || "Gray",
          active_status: Boolean(oneCaseData?.data.active_status) || false,
        },
        updatePart: oneCaseData?.data.parts.map(i => i.id),
      },
    });
    setVisibleAddImage(false);
  };

  const pushOrDellActiveLootBox = (id: number) => {
    if (!activeCaseImg.filter(item => item === id).length) {
      const array3 = activeCaseImg.filter(i => i !== 0).concat([id]);
      setActiveCaseImg(array3);
    } else {
      const array4 = activeCaseImg.filter(item => item !== id && item !== 0);
      setActiveCaseImg(array4);
    }
  };

  return (
    <AdminContentWrapper>
      <BackBtn
        onClick={() => history.push(`/admin/lootboxes/${params.pageId}`)}
      >
        &lt; BACK
      </BackBtn>
      <UploadFilesWrapper>
        <InputWrapper>
          <StyledInput name="files" onChange={uploadImgFile} type="file" />
          <label htmlFor="">Upload your files</label>
        </InputWrapper>
        <SubmitBtn onClick={() => uploadImage()} disabled={!files}>
          Upload
        </SubmitBtn>
      </UploadFilesWrapper>
      {loadingOneCase ? (
        <CustomLoader margin="100px 0" />
      ) : (
        <>
          <TableWrapper>
            <ButtonAddNew onClick={() => setVisibleAddDetail(true)}>
              Add new component
            </ButtonAddNew>
            <MainColumn>
              {oneCase?.images.length === 0 ? (
                <ImgDiv
                  onClick={() => {
                    setVisibleAddImage(true);
                  }}
                >
                  Add Image
                </ImgDiv>
              ) : (
                <ImgDiv onClick={() => setVisibleAddImage(true)}>
                  <img src={`${imageRoute}${oneCase?.images[0].key}`} alt="" />
                </ImgDiv>
              )}
              <TitleCase>
                <span>{oneCase?.name}</span>
              </TitleCase>
            </MainColumn>
            {detailsCase?.length === 0 && (
              <ColumnNotDetails>Is not details</ColumnNotDetails>
            )}
            {detailsCase &&
              detailsCase.map(item => (
                <Column key={item.id}>
                  <ImgDetail>
                    <img
                      src={`${imageRoute}${checkImageSrc(
                        item.images,
                        "Thumbnail_Layer",
                      )}`}
                      alt=""
                    />
                  </ImgDetail>
                  <div>{item.name}</div>
                  <IdCase>
                    id: {item.id}
                    <div onClick={() => deleteDetail(item.id)}>X</div>
                  </IdCase>
                </Column>
              ))}
          </TableWrapper>
        </>
      )}
      {visibleAddDetail && (
        <ModalAdminAddDetail
          idBox={+params.caseId}
          visible={visibleAddDetail}
          onClose={() => setVisibleAddDetail(false)}
        />
      )}
      {visibleAddImage && (
        <Modal
          visible={visibleAddImage}
          onClose={() => setVisibleAddImage(false)}
        >
          <ModalContent>
            <h3>Select Image</h3>
            {isLoading ? (
              <CustomLoader margin="100px 0" />
            ) : (
              <>
                <GalleryLootBox>
                  {galleryLootBox?.data.map(item => (
                    <RobotWrapper
                      active={
                        !!activeCaseImg?.filter(it => it === item.id).length
                      }
                      key={item.id}
                      onClick={() => pushOrDellActiveLootBox(item.id)}
                    >
                      <ItemModal>
                        <RobotModal src={`${imageRoute}${item.key}`} alt="" />
                      </ItemModal>
                    </RobotWrapper>
                  ))}
                </GalleryLootBox>
                <ModalButton>
                  <TedButton
                    size="modal"
                    width="260"
                    color="green"
                    onclick={() => confirmImageLootBox()}
                  >
                    Confirm
                  </TedButton>
                </ModalButton>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </AdminContentWrapper>
  );
};

export default AdminEditCase;

const BackBtn = styled.div`
  color: white;
  background: black;
  padding: 13px 32px;
  border-radius: 20px;
  position: absolute;
  top: 150px;
  left: 150px;
  :hover {
    cursor: pointer;
  }
`;

const ColumnNotDetails = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 18px;
  background: #1c252e;
  border-radius: 20px;
  width: 100%;
  height: 60px;
  color: white;
`;

const TitleCase = styled.div`
  margin-left: 150px;
  > span {
    font-size: 26px;
    -webkit-text-stroke: thick;
    font-style: italic;
    letter-spacing: 7px;
  }
`;

const SubmitBtn = styled.button`
  padding: 12px 36px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: green;
  box-shadow: 0px 2px 24px rgba(72, 128, 255, 0.2);
  border-radius: 24px;
  border: 1px solid green;
  margin-top: 10px;

  :hover {
    color: green;
    background: none;
    cursor: pointer;
  }

  :disabled {
    background: #a59e9e;
    border: 1px solid #a59e9e;
    color: #000;
    cursor: not-allowed;
  }
`;

const UploadFilesWrapper = styled.div`
  padding: 30px;
  border: 1px solid #000;
  background: #1c252e;
  margin: 90px 100px;
  border-radius: 15px;
  align-self: start;
`;

const StyledInput = styled.input<{ error?: boolean }>`
  width: 100%;
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.3px;
  color: #bebebe;
  outline: none;
  border: none;
  border-bottom: 1px solid #d4d4d4;

  padding-bottom: 7px;

  :focus {
    color: #757575;
    border-bottom: 1px solid #4a90e2;
  }

  :focus ~ label {
    color: #4a90e2;
  }
`;

const InputWrapper = styled.div`
  min-width: 189px;
  display: flex;
  flex-direction: column-reverse;

  label {
    font-family: "Nunito";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.257143px;
    color: #a1a1a1;
    margin-bottom: 2px;
  }
`;

const ImgDetail = styled.div`
  > img {
    height: 60px;
  }
`;

const IdCase = styled.div`
  align-items: center;
  > div {
    margin-left: 60px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: pointer;
      background: red;
      border-radius: 50%;
    }
  }
`;

const ImgDiv = styled.div`
  align-items: center;
  width: 100px;
  margin-left: 80px;
  > img {
    height: 125px;
  }
  :hover {
    cursor: pointer;
  }
`;

const MainColumn = styled.div`
  margin-top: 18px;
  background: #1c252e;
  border-radius: 20px;
  display: flex;
  width: 100%;
  height: 100px;
  color: white;
  align-items: center;
`;

const Column = styled.div`
  margin-top: 18px;
  background: #1c252e;
  border-radius: 20px;
  display: flex;
  width: calc(100% - 100px);
  height: 60px;
  padding: 0 50px;
  align-items: center;
  justify-content: space-between;
  color: white;
  > div {
    display: flex;
    justify-content: center;
    min-width: 160px;
  }
`;
const TableWrapper = styled.div`
  width: 1000px;
  margin-top: 30px;
  align-self: start;
`;

const ButtonAddNew = styled.div`
  float: right;
  margin-bottom: 16px;
  color: #fff;
  broder: none;
  border-radius: 10px;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  place-self: flex-end;
  :hover {
    cursor: pointer;
  }
`;

const AdminContentWrapper = styled.div`
  margin: -50px 0 -50px 0;
  min-height: calc(100vh - 90px);
  background: #050b1c;
  padding-top: 130px;
  display: flex;
  padding-bottom: 100px;

  align-items: center;
  width: 100%;
`;

const GalleryLootBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 350px;
`;
const RobotWrapper = styled.div<{
  active: boolean;
}>`
  margin: 6px;
  background: #0b1014;
  border-radius: 12px;
  width: 223px;
  height: 266px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  border: 2px solid #0b1014;

  :hover {
    cursor: pointer;
  }

  ${props =>
    props.active
      ? `background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  border: 2px solid #29efa8;`
      : ""}
`;

const ModalButton = styled.div`
  display: flex;
  margin: 28px 0;
`;

const RobotModal = styled.img`
  z-index: 5;
  width: 196px;
`;

const ItemModal = styled.div`
  width: 183px;
  height: 183px;
  position: relative;
  display: flex;
  color: #ffffff;

  > h3 {
    margin: 23px 0 4px 0;
    font-size: 16px;
    line-height: 19px;
  }

  > p {
    font-size: 12px;
    line-height: 14px;
    color: #616d7a;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80wh;

  background: linear-gradient(45deg, #1f2933 3%, #0e141a 3%);
  border-radius: 12px;
  color: #ffffff;
  text-align: center;

  > h3 {
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    margin-top: 32px;
  }

  > img {
    margin-top: 12px;
  }
`;
