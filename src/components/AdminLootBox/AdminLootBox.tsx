import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ModalAdminAddNewLoot } from "../common/Modals/ModalAdminAddNewLoot";
import { CustomLoader } from "../common/Loader";
import { useAdminPostAllLootBoxes } from "../../hooks/useAdminPostAllLootBoxes";
import { useAdminDeleteLootBox } from "../../hooks/useAdminDeleteLootBox";
import { ModalAdminEditLooBox } from "../common/Modals/ModalAdminEditLooBox";
import Modal from "../common/Modal";
import smallDiamond from "../../assets/img/smallDiamond.svg";
import { imageRoute } from "../../utils/api";
import { Pagination } from "../common/Pagination";

export const AdminLootBox = () => {
  const [visibleModalEditBox, setVisibleModalEditBox] =
    useState<boolean>(false);

  const history = useHistory();

  const [activeId, setActiveId] = useState<number>(0);

  useEffect(() => {
    activeId === 0
      ? setVisibleModalEditBox(false)
      : setVisibleModalEditBox(true);
  }, [activeId]);

  const params = useParams<{ pageId: string }>();

  const { data: adminTableData, isLoading: isGetLoadingAdminLootBox } =
    useAdminPostAllLootBoxes({
      limit: 10,
      maxPrice: 10000000,
      minPrice: 0,
      page: 1,
      pageId: +params.pageId,
      types: null,
    });

  const { mutate: manipulateWithBtn } = useAdminDeleteLootBox();

  const allCaseData = adminTableData?.data.rows || [];

  const [visibleAddNewLoot, setVisibleAddNewLoot] = useState<boolean>(false);

  return (
    <AdminContentWrapper>
      {isGetLoadingAdminLootBox ? (
        <CustomLoader margin="130px auto" />
      ) : (
        <>
          <TableWrapper>
            <ButtonAddNew onClick={() => setVisibleAddNewLoot(true)}>
              Add new box
            </ButtonAddNew>
            <TitleColumn>
              <div>Images</div>
              <div>Name</div>
              <div>Price</div>
              <div>Token</div>
              <div>Rarity</div>
              <div>Action</div>
            </TitleColumn>
            {allCaseData.map(item => (
              <Column key={item.id}>
                <ImgDiv>
                  {item.images.length === 0 ? (
                    "Not Images"
                  ) : (
                    <img src={`${imageRoute}${item.images[0].key}`} alt="" />
                  )}
                </ImgDiv>

                <div>{item.name}</div>
                <CristalCount>
                  <img src={smallDiamond} alt="" />
                  <div>{item.price} MIP</div>
                </CristalCount>
                <div>{item.loot_tokens}</div>
                <div>{item.rarity}</div>
                <ActionWrapper>
                  <ActionDiv>
                    <EditCase onClick={() => setActiveId(item.id)}>
                      Edit case
                    </EditCase>
                    <OpenCase
                      onClick={() =>
                        history.push(
                          `/admin/lootbox/${params.pageId}/case/${item.id}`,
                        )
                      }
                    >
                      Open case
                    </OpenCase>
                  </ActionDiv>
                  <DelCase>
                    <span
                      onClick={() => {
                        manipulateWithBtn({ id: item.id });
                      }}
                    >
                      X
                    </span>
                  </DelCase>
                </ActionWrapper>
              </Column>
            ))}
          </TableWrapper>
          {adminTableData?.data.rows.length ? (
            <PaginationWrapper>
              <Pagination
                pageNumber={params.pageId}
                itemsPerPage={10}
                itemsCount={adminTableData.data.count}
              />
            </PaginationWrapper>
          ) : (
            ""
          )}
        </>
      )}

      {visibleAddNewLoot && (
        <ModalAdminAddNewLoot
          visible={visibleAddNewLoot}
          onClose={() => setVisibleAddNewLoot(false)}
        />
      )}
      {visibleModalEditBox && (
        <Modal
          visible={visibleModalEditBox}
          onClose={() => setVisibleModalEditBox(false)}
        >
          <ModalAdminEditLooBox
            setActiveId={() => setActiveId(0)}
            idBox={activeId}
            onClose={() => setVisibleModalEditBox(false)}
          />
        </Modal>
      )}
    </AdminContentWrapper>
  );
};

const PaginationWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleColumn = styled.div`
  margin-top: 18px;
  background: #1c252e;
  align-items: center;
  border-radius: 20px;
  display: flex;
  width: 100%;
  height: 40px;
  color: white;
  > div {
    display: flex;
    justify-content: center;
    min-width: 215px;
    :first-child {
      min-width: 163px;
    }
  }
`;

const ActionWrapper = styled.div`
  align-items: center;
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffd63d;
  }

  > img {
    margin: -1px 6px 0 0;
  }
`;

const Column = styled.div`
  margin-top: 18px;
  background: #1c252e;
  border-radius: 20px;
  display: flex;
  width: 100%;
  height: 120px;
  justify-content: space-between;
  color: white;
  > div {
    display: flex;
    justify-content: center;
    min-width: 160px;
    align-items: center;
  }
`;
const DelCase = styled.div`
  align-items: center;
  margin: 0 30px;
  > span {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    font-size: 23px;
    justify-content: center;
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
  > img {
    height: 140px;
  }
`;

const OpenCase = styled.div`
  color: white;
  background: #1c252e;
  border: 1px solid #ffd63d;
  margin-top: 12px;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  :hover {
    color: #ffd63d;
  }
`;

const EditCase = styled.div`
  background: green;
  text-align: center;
  border: 1px solid green;
  border-radius: 6px;
  padding: 8px 0;
  :hover {
    background: #1c252e;
    color: green;
`;

const ActionDiv = styled.div`
  flex-direction: column;
  width: 140px;
  > div {
    :hover {
      cursor: pointer;
    }
  }
`;

const ButtonAddNew = styled.div`
  float: right;
  color: #fff;
  broder: none;
  border-radius: 10px;
  background: green;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  margin-bottom: 14px;
  :hover {
    cursor: pointer;
    background: none;
    color: green;
  }
`;

const TableWrapper = styled.div`
  width: 1300px;
  margin-bottom: 50px;
`;

const AdminContentWrapper = styled.div`
  margin: -50px 0 -50px 0;
  min-height: calc(100vh - 90px);
  background: #050b1c;
  padding-top: 130px;
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
`;
