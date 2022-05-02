import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imageRoute } from "../../utils/api";
import CustomLoader from "../common/Loader";
import Modal from "../common/Modal";
import {
  checkImageSrc,
  checkTier,
  customStylesForGarageSelect,
} from "../../utils/commonFunctions";
import Pagination from "../common/Pagination";
import { ReactComponent as SearchIcon } from "../../assets/img/search.svg";
import Switcher from "../common/Switcher";
import Select from "react-select";
import { useGetParamsForDetailsFilter } from "../../hooks/useGetParamsForDetailsFilter";
import smallDiamond from "../../assets/img/smallDiamond.svg";
import accept from "../../assets/img/correct.png";
import failed from "../../assets/img/failed.png";
import { ModalAdminEditDetailMarket } from "../common/Modals/ModalAdminEditDetailMarket";
// import { useAdminPutAddDetailMarket } from "../../hooks/useAdminPutAddDetailMarket";
import { useAdminGetAllSpareParts } from "../../hooks/useAdminGetAllSpareParts";

const AdminMarket = () => {
  const [activeId, setActiveId] = useState<number>(0);

  // const { mutate: addDetailMarket } = useAdminPutAddDetailMarket();

  // const { mutate: deleteDetailMarket } = useAdminPutAddDetailMarket();

  const openFunModalEditBox = (id: number) => {
    setActiveId(id);
  };

  const closeFunModalEditBox = () => {
    setActiveId(0);
  };

  const params = useParams<{ marketPageNumber: string }>();

  const [partSelectValue, setPartSelectValue] = useState<string>("");
  const [factionSelectValue, setFactionSelectValue] = useState<string>("");
  const [searchStr, setSearchStr] = useState<string>("");

  const { data: filterParams } = useGetParamsForDetailsFilter();

  const checkFilterParams = (str: "faction" | "part") => {
    const emptyFilter = {
      value: "",
      label: `No ${str} filter`,
    };
    const filterParamsArr = filterParams?.data[str].map(item => {
      return {
        value: item,
        label: item,
      };
    });
    return filterParamsArr ? [emptyFilter, ...filterParamsArr] : [emptyFilter];
  };

  const { data: spareParts, isLoading: isGetSparePartsLoading } =
    useAdminGetAllSpareParts({
      page: Number(params.marketPageNumber),
      filter: {
        part: partSelectValue,
        name: searchStr,
        faction: factionSelectValue,
      },
    });
  const [switchers, setSwitchers] = useState<boolean>(false);

  return (
    <AdminContentWrapper>
      <MaketTools>
        <MarketFilter>
          <SearchInputWrapper>
            <SearchIcon />
            <SearchInput
              value={searchStr}
              onChange={e => setSearchStr(e.currentTarget.value)}
              placeholder="Enter your request"
            />
          </SearchInputWrapper>
        </MarketFilter>
        <MarketSelect>
          <SwitcherWrapper>
            <Switcher
              active={switchers}
              setActive={() => setSwitchers(!switchers)}
            />
          </SwitcherWrapper>
          <SelectWrapper>
            <Select
              onChange={(e: any) => setFactionSelectValue(e?.value || "")}
              options={checkFilterParams("faction")}
              styles={customStylesForGarageSelect}
              placeholder="Chose Faction..."
            />
          </SelectWrapper>
          <SelectWrapper>
            <Select
              onChange={(e: any) => setPartSelectValue(e?.value || "")}
              options={checkFilterParams("part")}
              styles={customStylesForGarageSelect}
              placeholder="Chose Part..."
            />
          </SelectWrapper>
        </MarketSelect>
      </MaketTools>
      {isGetSparePartsLoading ? (
        <CustomLoader margin="130px auto" />
      ) : (
        <>
          <TableWrapper>
            <TitleColumn>
              <div>Images</div>
              <div>Name</div>
              <div>Tier</div>
              <div>Buy</div>
              <div>Sell</div>
              <div>Action</div>
            </TitleColumn>

            {isGetSparePartsLoading ? (
              <CustomLoader margin="20px 0 0 30px;" />
            ) : !spareParts?.data.result.length ? (
              <NoItemTitle>You have no items in inventory now!</NoItemTitle>
            ) : (
              spareParts?.data.result.map(invItem => (
                <Column key={invItem.id}>
                  <ImgDiv>
                    <img
                      src={`${imageRoute}${checkImageSrc(
                        invItem.images,
                        "Thumbnail_Layer",
                      )}`}
                      alt=""
                    />
                  </ImgDiv>
                  <div>{invItem.name.split("_").slice(-2).join(" ")}</div>
                  <div>
                    {checkTier(invItem.partparams) === "Fanatic"
                      ? "Tier 1"
                      : checkTier(invItem.partparams) === "Adept"
                        ? "Tier 2"
                        : "Tier 3"}
                  </div>
                  <PriceDiv>
                    <CristalCount>
                      <span>{invItem.price} </span>
                      <LazyLoadImage
                        alt={''}
                        effect="blur"
                        src={smallDiamond} />

                    </CristalCount>
                  </PriceDiv>
                  <SellDiv>
                    <CristalCount>
                      <span>{invItem.sell} </span>
                      <LazyLoadImage
                        alt={''}
                        effect="blur"
                        src={smallDiamond} />
                    </CristalCount>
                  </SellDiv>
                  <CheckMarket>
                    <EditDetail onClick={() => openFunModalEditBox(invItem.id)}>
                      Edit
                    </EditDetail>
                    {invItem.market ? (
                           <LazyLoadImage
                           alt={''}
                           effect="blur"
                           src={failed} />
                      // <img
                      //   src={failed}
                      //   alt=""
                      // // onClick={() => addDetailMarket({ id: invItem.id })}
                      // />
                    ) : (
                      <LazyLoadImage
                      alt={''}
                      effect="blur"
                      src={accept} />
                      // <img
                      //   src={accept}
                      //   alt=""
                      // //onClick={() => deleteDetailMarket({ id: invItem.id })}
                      // />
                    )}
                  </CheckMarket>
                </Column>
              ))
            )}
            {spareParts?.data.result.length ? (
              <PaginationWrapper>
                <Pagination
                  pageNumber={params.marketPageNumber}
                  itemsPerPage={10}
                  itemsCount={spareParts?.data.count}
                />
              </PaginationWrapper>
            ) : (
              ""
            )}
          </TableWrapper>
        </>
      )}

      {activeId && (
        <Modal visible={!!activeId} onClose={() => closeFunModalEditBox()}>
          <ModalAdminEditDetailMarket
            idDetail={activeId}
            onClose={() => closeFunModalEditBox()}
          />
        </Modal>
      )}
    </AdminContentWrapper>
  );
};

export default AdminMarket;

const EditDetail = styled.div`
  cursor: pointer;

  border-radius: 8px;
  padding: 8px 30px;
  color: white;
  font-size: 14px;
  background: #03039a;
  border: none;
  margin: 0 15px;
`;

const CheckMarket = styled.div`
  > span > img {
    height: 25px;
  }
`;

const CristalCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  > span {
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #ffd63d;
  }

  > span > img {
    margin-left: 6px;
  }
`;

const PriceDiv = styled.div`
  padding-left: 35px;
`;

const SellDiv = styled.div`
  padding-left: 23px;
`;

const ImgDiv = styled.div`
  > img {
    height: 50px;
  }
`;

const SelectWrapper = styled.div`
  width: 192px;
  height: 46px;
  margin-left: 12px;
`;

const SwitcherWrapper = styled.div`
  display: none;
`;

const MarketSelect = styled.div`
  margin-right: 48px;
  display: flex;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  width: 361px;
  height: 46px;
  background: #161d24;
  border-radius: 6px;
  font-size: 14px;
  line-height: 17px;
  border: none;
  margin-left: 32px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 12px;
`;

const SearchInput = styled.input`
  margin-left: 12px;
  background: none;
  outline: none;
  border: none;
  color: #fff;

  ::placeholder {
    color: #616d7a;
  }
`;

const MarketFilter = styled.div`
  display: flex;
  margin-left: 12px;
`;

const MaketTools = styled.div`
  width: 1300px;
  display: flex;
  justify-content: space-between;
`;

const PaginationWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoItemTitle = styled.div``;

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

const Column = styled.div`
  margin-top: 18px;
  background: #1c252e;
  border-radius: 20px;
  display: flex;
  width: 100%;
  height: 60px;
  color: white;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 190px;
  }
`;

const TableWrapper = styled.div`
  width: 1300px;
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
