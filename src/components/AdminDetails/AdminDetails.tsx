import { useState } from "react";
import styled from "styled-components";
import { useValidateAdminImages } from "../../hooks/useValidateAdminImages";
import validateImg from "../../assets/img/validate.png";
import closeImg from "../../assets/img/close.png";
import { useUploadFileAdmin } from "../../hooks/useUploadFileAdmin";
import { CustomLoader } from "../common/Loader";
import { Modal } from "../common/Modal";

export type CustomFileList = {
  lastModified: number;
  lastModifedDate: Date;
  name: string;
  type: string;
  size: number;
  webkitRelativePath: string;
};

export const AdminDetails = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [files, setFiles] = useState<null | CustomFileList[]>(null);
  const {
    mutate: validateImagesHook,
    data: validatingData,
    isLoading: isValidateLoading,
  } = useValidateAdminImages();

  const { mutate: upload, isLoading } = useUploadFileAdmin();

  const uploadScreenshotFile = (e: any) => {
    setFiles(e.currentTarget.files);
  };

  const validateImages = () => {
    const imagesData = Array.from(files || [])?.map(img => {
      return {
        Key: img?.name,
        Size: img.size,
      };
    });
    const dataForValidate = {
      data: imagesData,
    };
    validateImagesHook(dataForValidate);
  };

  const uploadImages = () => {
    const approvedValidatedNames = validatingData?.data
      .filter(item => item.approved && !item.exist)
      .map(item => item.Key);
    const imgsForUploading = Array.from(files || [])?.filter(item =>
      approvedValidatedNames?.includes(item.name),
    );
    setLoader(true);
    imgsForUploading.forEach((item, idx, ar) => {
      const formData = new FormData();
      //@ts-ignore
      formData.append("image", imgsForUploading[idx]);
      upload(formData);
      if (idx === ar.length - 1) {
        setFiles(null);
      }
    });
    setLoader(false);
  };

  return (
    <>
      {(loader || isLoading) && (
        <Modal
          noContent={true}
          noClosing={true}
          visible={loader || isLoading}
          onClose={() => setLoader(false)}
        >
          <CustomLoader margin="20px 0 0 30px;" />
        </Modal>
      )}
      <UploadFilesWrapper>
        <InputWrapper>
          <StyledInput
            name="files"
            onChange={uploadScreenshotFile}
            type="file"
            multiple
          />
          <label htmlFor="">Upload your files</label>
        </InputWrapper>
        <SubmitBtn onClick={validateImages} disabled={!files?.length}>
          Check
        </SubmitBtn>
      </UploadFilesWrapper>
      {(validatingData || isValidateLoading) && files && (
        <TableFilesWrapper>
          {isValidateLoading ? (
            "Loading data ..."
          ) : (
            <>
              <TableFiles>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Validated</th>
                    <th>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {validatingData?.data.map((row, idx) => (
                    <tr key={row.Key}>
                      <td>{idx + 1}</td>
                      <td>{row.Key}</td>
                      <td>{row.Size}</td>
                      <td>
                        {row.approved && !row.exist ? (
                          <img src={validateImg} alt="" />
                        ) : (
                          <img src={closeImg} alt="" />
                        )}
                      </td>
                      <td>
                        {row.approved && !row.exist
                          ? "None"
                          : row.approved
                          ? "exist"
                          : row.traitError}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableFiles>
              <UploadButton
                disabled={
                  !validatingData?.data.filter(
                    file => file.approved && !file.exist,
                  ).length
                }
                onClick={uploadImages}
              >
                Upload validated files
              </UploadButton>
            </>
          )}
        </TableFilesWrapper>
      )}
    </>
  );
};

const UploadFilesWrapper = styled.div`
  padding: 30px;
  border: 1px solid #000;
`;

const InputWrapper = styled.div`
  min-width: 328px;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 21px;

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
  border-bottom: 1px solid ${props => (props.error ? "#ff0000" : "#D4D4D4")};

  padding-bottom: 7px;

  :focus {
    color: #757575;
    border-bottom: 1px solid #4a90e2;
  }

  :focus ~ label {
    color: #4a90e2;
  }
`;

const SubmitBtn = styled.button`
  padding: 14px 42px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #ea201a;
  box-shadow: 0px 2px 24px rgba(72, 128, 255, 0.2);
  border-radius: 24px;
  border: 1px solid #ea201a;

  :hover {
    color: #ea201a;
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

const UploadButton = styled.button`
  margin-top: 20px;
  padding: 14px 42px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #ea201a;
  box-shadow: 0px 2px 24px rgba(72, 128, 255, 0.2);
  border-radius: 24px;
  border: 1px solid #ea201a;

  :hover {
    color: #ea201a;
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

const TableFilesWrapper = styled.div`
  margin-top: 50px;
  width: 60%;
`;

const TableFiles = styled.table`
  width: 100%;

  th,
  td {
    border: 1px solid #c3c3c3;
    padding: 5px 0;
    vertical-align: middle;
    text-align: center;
  }
`;
