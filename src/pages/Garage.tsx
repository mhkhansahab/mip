import styled from "styled-components";
import { TedButton } from "../components/common/Button/TedButton";
import garageHeaderBg from "../assets/img/backgroundGarage.png";
import petGarage from "../assets/img/petGarage.svg";
import refresh from "../assets/img/refreshButtonGarage.svg";
import { RobotItemInterface } from "../components/common/RobotItemGarage";
import { InventoryItem } from "../components/common/InventoryItem";
import { RobotModel } from "../components/RobotModel";
import { useEffect, useState } from "react";
import { useGetAllRobotsInProfile } from "../hooks/useGetAllRobotsInProfile";
import { useGetAllSpareParts } from "../hooks/useGetAllSpareParts";
import { RobotType } from "../utils/commonTypes";
import { imageRoute, moralis_server_url, moralis_id, network_id } from "../utils/api";
import { CustomLoader } from "../components/common/Loader";
import { usePutRobotManipulation } from "../hooks/usePutRobotManipulation";
import { useParams } from "react-router-dom";
import { Pagination } from "../components/common/Pagination";
import Select from "react-select";
import { useGetParamsForDetailsFilter } from "../hooks/useGetParamsForDetailsFilter";
import { ReactComponent as SearchIcon } from "../assets/img/search.svg";
import { checkImageSrc, checkSingleParamInSparePart, checkTier, customStylesForGarageSelect } from "../utils/commonFunctions";
import Modal from "../components/common/Modal";
import { useMoveRobotToGarage } from "../hooks/useMoveRobotToGarage";
import diamond from "../assets/img/smallDiamond.svg";
import { useGetSellDetails } from "../hooks/useGetSellDetails";
import { useGetRefreshNFT } from "../hooks/useGetRefreshNFT";
import { useMintRobot } from "../hooks/useMintRobot";
import Moralis from "moralis";

type GaragePropsType = {
  garageCount: 1 | 2 | 3;
  wallet: string;
};

const Garage = (props: GaragePropsType) => {
  const params = useParams<{ garagePageNumber: string }>();
  const { data: _robots, isLoading: isGetRobotsLoading } = useGetAllRobotsInProfile();
  const { mutate: refreshNFT } = useGetRefreshNFT();
  const { data: filterParams } = useGetParamsForDetailsFilter();
  const [ activeGarage, setActiveGarage ] = useState<1 | 2 | 3>(1);
  const [ partSelectValue, setPartSelectValue ] = useState<string>("");
  const [ factionSelectValue, setFactionSelectValue ] = useState<string>("");
  const [ searchStr, setSearchStr ] = useState<string>("");
  const [ visibleSelectedRobot, setVisibleSelectedRobot ] = useState<boolean>(false);
  const { mutate: moveRobotToGarage, isLoading: moveRobotLoading } = useMoveRobotToGarage(setVisibleSelectedRobot);
  const [ isGettingMip, setGettingMIp] = useState(false);
  const [ robots, setRobots ] = useState<any[] | undefined>([]);

  const checkFilterParams = (str: "faction" | "part") => {
    const emptyFilter = {
      value: "",
      label: `No ${str} filter`
    };
    const filterParamsArr = filterParams?.data[str].map(item => {
      return {
        value: item,
        label: item,
      };
    });
    return filterParamsArr ? [emptyFilter, ...filterParamsArr] : [emptyFilter];
  };
  
  const { data: spareParts, isLoading: isGetSparePartsLoading } = useGetAllSpareParts({
    current_user: true,
    page: Number(params.garagePageNumber),
    filter: {
      part: partSelectValue,
      name: searchStr,
      faction: factionSelectValue
    }
  });

  const initMoralis = async () => {
    await Moralis.start({
      serverUrl: moralis_server_url,
      appId: moralis_id
    });
  };

  initMoralis();

  const getRobots = async (address: string) => {
    setRobots([]);
    setGettingMIp(true);
    Moralis.Web3API.account.getNFTs({chain: network_id as any, address: address}).then(data => {
      let mips = data.result?.filter(item => item.symbol === 'MIP').map(item => {
        let parts = [];
        if (item?.metadata) {
          parts = JSON.parse(item.metadata).attributes.map((attribute: { trait_type: string; value: string }) => {
            return {
              name: attribute.value,
              section: attribute.trait_type.split(' ')[0],
              att_type: attribute.trait_type.split(' ')[1],
            };
          }).filter((part: any) => part);
        }

        let robot = {
          name: item.metadata? JSON.parse(item.metadata).name : 'MIP #' + item.token_id,
          token_id: item.token_id,
          image: "https://ipfs.io/ipfs/Qma5friW5aQ5P6eUs8sK7mfWbRn5ArcnGCVUGZz9sumtwg/" + item.token_id + ".jpg",
          status: 'NFT',
          description: item.metadata? JSON.parse(item.metadata).description : '',
          external_url: item.metadata? JSON.parse(item.metadata).external_url : '',
          license: item.metadata? parts.filter((part: any) => part.att_type === 'License')[0].name : 'Active',
          type: item.metadata? parts.filter((part: any) => part.att_type === 'Type')[0].name : 'Kohai Head',
          env: item.metadata? parts.filter((part: any) => part.att_type === 'Environment')[0].name : 'Garage',
          parts: parts.filter((part: any) => part.section !== 'MIP')
        };

        return robot;
      });
      setRobots(mips?.sort((a, b) => parseInt(a.token_id) - parseInt(b.token_id)));
      setGettingMIp(false);
      setVisibleSelectedRobot(true);
    });
  };

  const { mutate: manipulateWithBtn, isLoading: isManipulationLoading } =
    usePutRobotManipulation();

  const [activeRobot, setActiveRobot] = useState<{
    id: number;
    tokenId: number;
  } | null>(null);

  useEffect(() => {
    if (_robots?.data.length) {
      const robotWithTypeThisGarage = _robots.data.filter(
        robot => robot.status === `Garage ${activeGarage}`,
      );
      if (robotWithTypeThisGarage.length) {
        setActiveRobot({
          id: robotWithTypeThisGarage[0].id,
          tokenId: +robotWithTypeThisGarage[0].token_id,
        });
        const sameGarageAndNftRobot = _robots.data
        .filter(
          robot => robot.token_id === robotWithTypeThisGarage[0].token_id,
        )
        .filter(garRobot => garRobot.status === `Garage ${activeGarage}`)[0];
        setIdRobotVis({
          id: sameGarageAndNftRobot.id,
          tokenId: +sameGarageAndNftRobot.token_id,
        });
      }
    }
  }, [_robots?.data, activeRobot?.id, activeGarage]);

  const handleManipulate = (partId: number, type: "replace" | "remove") => {
    manipulateWithBtn({
      robotId: activeRobot?.id || 0,
      manipulation: {
        type,
        partId,
      },
    });
  };

  const checkThatDetailActive = (detailId: number, robots: RobotType[]) => {
    const currentRobot = robots.filter(robot => robot.id === activeRobot?.id);
    if (currentRobot.length) {
      const filtredRobotsDetails = currentRobot[0].parts.filter(
        detail => detail.id === detailId,
      );
      return !!filtredRobotsDetails.length;
    }
    return false;
  };

  const currentRobotInThisGarage = _robots?.data.filter(
    robot => robot.id === activeRobot?.id,
  )[0];

  console.log('active robot id: ', activeRobot?.id);
  console.log('robots : ', robots);
  console.log('_robots : ', _robots?.data);
  console.log('current Robot In this Garage : ', currentRobotInThisGarage);

  const robotDetails = currentRobotInThisGarage?.parts.map(det => {
    if (det.trait_type.split(' ')[0] === "MIPHead") {
      return det;
    }
    return null;
  }).filter(det => !!det);

  const childreDetails = currentRobotInThisGarage?.parts.map(det => {
    if (det.trait_type.split(' ')[0] === "Driver") {
      return det;
    }
    return null;
  }).filter(det => !!det);

  const petDetails = currentRobotInThisGarage?.parts.map(det => {
    if (det.trait_type.split(' ')[0] === "Pet") {
      return det;
    }
    return null;
  }).filter(det => !!det);

  const [idRobotVis, setIdRobotVis] = useState<{ id: number | null; tokenId: number | null;} | null>({
    id: activeRobot?.id || null,
    tokenId: activeRobot?.tokenId || null,
  });

  const handleRobot = (id: number, tokenId: number) => {
    id !== idRobotVis?.id? setIdRobotVis({ id, tokenId }) : setIdRobotVis(null);
  };

  const confirmRobot = () => {
    setActiveRobot({ id: idRobotVis?.id as number, tokenId: idRobotVis?.id as number });
    console.log('aID', idRobotVis?.id);
    console.log('post data : ', robots);
    moveRobotToGarage({ robotId: idRobotVis?.id || 0, robotData: robots?.slice(0, 80) });
  };

  const { mutate: dataSellDetail } = useGetSellDetails();

  const [visAcceptSellDetail, setVisAcceptSellDetail] = useState<{ name: string; sell: number; id: number; } | null>(null);

  const sellDetail = (id: number, idRob: number) => {
    dataSellDetail({ id, idRob });
    setVisAcceptSellDetail(null);
  };

  const { mutate: mintNow, isLoading: isMintingNow } = useMintRobot();

  return (
    <GarageContainer>
      <MenuGarage>
        <GarageTab
          active={activeGarage === 1}
          onClick={() => setActiveGarage(1)}
        >
          Garage 1
        </GarageTab>
        {props.garageCount > 1 && (
          <GarageTab
            active={activeGarage === 2}
            onClick={() => setActiveGarage(2)}
          >
            Garage 2
          </GarageTab>
        )}
        {props.garageCount > 2 && (
          <GarageTab
            active={activeGarage === 3}
            onClick={() => setActiveGarage(3)}
          >
            Garage 3
          </GarageTab>
        )}
      </MenuGarage>
      {isGetRobotsLoading ? (
        <CustomLoader margin="100px 0" />
      ) : (
        <>
          <GarageInterfaceRobot>
            <LeftRobotsGarage>
              <h1>Robot</h1>
              <GarageHeaderRobot>
                {robotDetails?.map(
                  detail =>
                    detail?.images.length && (
                      <RobotItemInterface
                        sell={detail.price || 0}
                        manipulate={handleManipulate}
                        id={detail.id}
                        descr={detail.type}
                        nameItems={detail.name}
                        imgSrc={checkImageSrc(detail.images, "Thumbnail_Layer")}
                        key={detail?.id}
                        name={detail.trait_type.split(' ')[1]}
                        idRob={idRobotVis?.id || 0}
                        isDisable={ detail?.isDisable }
                      />
                    ),
                )}
              </GarageHeaderRobot>
              {!robotDetails?.length && (
                <p>You have no apply robot details yet</p>
              )}

              <h2>Children</h2>
              <GarageHeaderRobot>
                {childreDetails?.map(
                  detail =>
                    detail?.images.length && (
                      <RobotItemInterface
                        sell={detail.price || 0}
                        manipulate={handleManipulate}
                        id={detail.id}
                        descr={detail.type}
                        nameItems={detail.name}
                        imgSrc={checkImageSrc(detail?.images, "Thumbnail_Layer")}
                        key={detail?.id}
                        name={detail.trait_type.split(' ')[1]}
                        idRob={idRobotVis?.id || 0}
                        isDisable={ detail?.isDisable }
                      />
                    ),
                )}
              </GarageHeaderRobot>
              {!childreDetails?.length && (
                <p>You have no apply children details yet</p>
              )}
            </LeftRobotsGarage>

            {currentRobotInThisGarage && (
              <MainRobotGarage>
                <RobotModel
                  id={activeRobot?.id || null}
                  robotParts={currentRobotInThisGarage?.parts}
                />
              </MainRobotGarage>
            )}

            <RightPetsGarage>
              <GaragePetRobot>
                <PetRobot src={petGarage} />
              </GaragePetRobot>
              <h1>Pet</h1>
              <GarageHeaderPets>
                {petDetails?.map(
                  detail =>
                    detail?.images.length && (
                      <RobotItemInterface
                        sell={detail.price || 0}
                        manipulate={handleManipulate}
                        id={detail.id}
                        descr={detail.type}
                        nameItems={detail.name}
                        imgSrc={checkImageSrc(detail?.images, "Thumbnail_Layer")}
                        key={detail?.id}
                        name={detail.trait_type.split(' ')[1]}
                        idRob={idRobotVis?.id || 0}
                        isDisable={ detail?.isDisable }
                      />
                    ),
                )}
              </GarageHeaderPets>
              {!petDetails?.length && <p>You have no apply pet details yet</p>}
            </RightPetsGarage>
          </GarageInterfaceRobot>

          <ButWrapper>
            <SelectButtonWrapper>
              <TedButton
                color="green"
                width="100%"
                size="big"
                onclick={() => {
                  getRobots(props.wallet);
                }}
                loading={isGettingMip}
                disabled={isGettingMip}
              >
                SELECT MIP
              </TedButton>
            </SelectButtonWrapper>

            <ReturnButtonWrapper>
              <TedButton
                color="blue"
                width="100%"
                size="big"
                refresh={true}
                onclick={() => refreshNFT({ wallet: props.wallet })}
              >
                <img src={refresh} alt="" />
              </TedButton>
            </ReturnButtonWrapper>

            <MintNowButtonWrapper>
              <TedButton
                disabled={!activeRobot || isMintingNow}
                onclick={() => mintNow({ robotId: Number(activeRobot) })}
                color="yellow"
                width="100%"
                size="big"
                loading={isMintingNow}
              >
                MINT NOW
              </TedButton>
            </MintNowButtonWrapper>
          </ButWrapper>
        </>
      )}
      {robots && activeRobot && (
        <InventoryWrapper>
          <InventoryTools>
            <InvFilter>
              <h3>Inventory</h3>
              <SearchInputWrapper>
                <SearchIcon />
                <SearchInput
                  value={searchStr}
                  onChange={e => setSearchStr(e.currentTarget.value)}
                  placeholder="Enter your request"
                />
              </SearchInputWrapper>
            </InvFilter>
            <InvSelect>
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
            </InvSelect>
          </InventoryTools>

          <InventoryItems>
            {isGetSparePartsLoading ? (
              <CustomLoader margin="20px 0 0 30px;" />
            ) : !spareParts?.data.result.length ? (
              <NoItemTitle>You have no items in inventory now!</NoItemTitle>
            ) : (
              spareParts?.data.result.map(invItem => (
                <InventoryItem
                  openSellingModal={setVisAcceptSellDetail}
                  sell={invItem.sell || 0}
                  name={invItem.name}
                  part={checkSingleParamInSparePart("part", invItem.partparams)}
                  material={checkSingleParamInSparePart("material", invItem.partparams)}
                  price={invItem.price || 0}
                  visible={invItem.visible}
                  key={invItem.id}
                  imgSrc={`${imageRoute}${checkImageSrc(invItem.images, "Thumbnail_Layer")}`}
                  active={checkThatDetailActive(invItem.id, robots)}
                  id={invItem.id}
                  manipulate={handleManipulate}
                  isManipulateLoading={isManipulationLoading}
                  tier={checkTier(invItem.partparams)}
                  count={invItem.users ? invItem.users[0].user_part.count : 0}
                  robotId={activeRobot.id}
                  isDisable={invItem.isDisable}
                />
              ))
            )}
          </InventoryItems>
          {(spareParts?.data.count || 0) > 21 ? (
            <PaginationWrapper>
              <Pagination
                pageNumber={params.garagePageNumber}
                itemsPerPage={21}
                itemsCount={spareParts?.data.count || 0}
              />
            </PaginationWrapper>
          ) : (
            ""
          )}
        </InventoryWrapper>
      )}
      {visibleSelectedRobot && (
        <Modal
          visible={visibleSelectedRobot}
          onClose={() => setVisibleSelectedRobot(false)}
        >
          <ModalContent>
            <h3>Select MIP</h3>
            <RobotsWrapper>
              {robots?.map(item => (
                <RobotWrapper
                  activeRobot={+parseInt(item.token_id) === idRobotVis?.tokenId}
                  key={item.token_id}
                  onClick={() => handleRobot(item.token_id, +parseInt(item.token_id))}
                >
                  <ItemModal>
                    <RobotModal src={item.image} alt="" />
                  </ItemModal>
                  <TextModal>
                    <h3>{item.name}</h3>
                    <p>{item.status}</p>
                  </TextModal>
                </RobotWrapper>
              ))}
            </RobotsWrapper>
            <ModalButton>
              {moveRobotLoading ? (
                <CustomLoader
                  margin="0"
                  height="48px"
                  width="100px"
                  selectMip={true}
                />
              ) : (
                <TedButton
                  size="modal"
                  width="260"
                  color="green"
                  onclick={() => confirmRobot()}
                  disabled={!idRobotVis}
                >
                  Confirm
                </TedButton>
              )}
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
      {visAcceptSellDetail && (
        <Modal
          visible={!!visAcceptSellDetail}
          onClose={() => setVisAcceptSellDetail(null)}
        >
          <SellModalContent>
            <h3>Confirm your actions</h3>
            <SellRobotsWrapper>
              <div>
                Do you really want to sell the item? <br />
                {visAcceptSellDetail.name} <br />
                <Diamonds>
                  <span>for </span> <p>{visAcceptSellDetail.sell}</p>{" "}
                  <img src={diamond} alt="" />
                </Diamonds>
              </div>
            </SellRobotsWrapper>
            <SellModalButton>
              <AcceptSell
                onClick={() =>
                  sellDetail(visAcceptSellDetail.id, idRobotVis?.id || 0)
                }
              >
                Yes
              </AcceptSell>
              <NotSell onClick={() => setVisAcceptSellDetail(null)}>No</NotSell>
            </SellModalButton>
          </SellModalContent>
        </Modal>
      )}
    </GarageContainer>
  );
};

export default Garage;

const NoItemTitle = styled.div``;

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

  @media (max-width: 1150px) {
    width: auto;
  }

  @media (max-width: 980px) {
    margin-left: 0;
    margin-top: 15px;
    width: calc(100% - 15px);
  }
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

  @media (max-width: 980px) {
    width: 100%;
  }
`;

const InventoryWrapper = styled.div`
  margin: 27px 0 32px 0;
  width: 100%;
`;

const InventoryTools = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 38px;
  }
`;

const InventoryItems = styled.div`
  margin: 20px 0 0 30px;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 446px) {
    margin: 20px 15px;
  }
`;

const InvFilter = styled.div`
  display: flex;
  margin-left: 48px;

  > h3 {
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
  }

  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
    margin-bottom: 20px;
    width: 100%;
  }
`;

const InvSelect = styled.div`
  margin-right: 48px;
  display: flex;

  @media (max-width: 980px) {
    width: calc(100% - 15px);
    justify-content: space-between;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: normal;
  }
`;

const ButWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 680px;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: normal;
    align-items: center;
    width: auto;
  }
`;

const RightPetsGarage = styled.div`
  width: 33%;
  height: 529px;
  text-align: center;

  > h1 {
    margin: 20px 0 32px 0;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
  }

  @media (max-width: 1350px) {
    height: auto;
    order: 3;
    width: auto;
    margin: 0 88px 40px 88px;
    align-self: flex-start;
  }

  @media (max-width: 480px) {
    margin: 0 5% 30px 5%;
  }
`;

const GaragePetRobot = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 23px;
`;

const PetRobot = styled.img`
  height: 178px;
`;

const LeftRobotsGarage = styled.div`
  width: 33%;

  > h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
  }

  > h2 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    margin-top: 40px;
  }

  @media (max-width: 1366px) {
    width: 530px;
    height: auto;
  }

  @media (max-width: 1350px) {
    order: 2;
    width: auto;
    margin: 0 88px;
    align-self: flex-start;
  }

  @media (max-width: 480px) {
    margin: 0 5%;
  }
`;

const MainRobotGarage = styled.div`
  width: 34%;
  position: relative;
  z-index: 1;

  > img {
    width: 100%;
  }

  @media (max-width: 1350px) {
    order: 1;
    height: 552px;
    margin-left: 0;
  }

  @media (max-width: 980px) {
    width: 450px;
    height: 450px;
  }

  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
`;

const GarageHeaderRobot = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;

  > div {
    width: 25%;
    height: 130px;
    margin-bottom: 18px;
  }

  @media (max-width: 1050px) {
    > div {
      width: 116px;
      margin: 18px 5px 0 0;
    }
  }
`;

const GarageHeaderPets = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin: 0 25px 20px 0;
  }
`;

const GarageInterfaceRobot = styled.div`
  background-image: url(${garageHeaderBg});
  width: 100%;
  display: flex;
  box-sizing: border-box;
  background-size: cover;
  padding: 3%;

  @media (max-width: 1350px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
`;

const GarageTab = styled.div<{ active: boolean }>`
  background: ${props => (props.active ? "#0a0b0d" : "none")};
  border-radius: 12px 12px 0px 0px;
  width: 200px;
  height: 50px;
  align-items: end;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 17px;

  :hover {
    cursor: pointer;
  }
`;

const MenuGarage = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(180deg, rgba(12, 14, 19, 0) 0%, #131a22 100%);
  width: 100%;
  height: 77px;
`;

const GarageContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PaginationWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: 192px;
  height: 46px;
  margin-left: 12px;

  @media (max-width: 980px) {
    margin: 0;
    width: 35%;
  }

  @media (max-width: 480px) {
    margin: 0 0 15px 0;
    width: 100%;
  }
`;

const RobotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 300px;
  width: 100%;
`;
const RobotWrapper = styled.div<{
  activeRobot: boolean;
}>`
  margin: 6px;
  background: #0b1014;
  border-radius: 12px;
  width: 226px;
  height: 266px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  border: 2px solid #0b1014;
  ${props =>
    props.activeRobot
      ? `background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  border: 2px solid #29efa8;`
      : ""}
  : hover {
    cursor: pointer;
  }
`;

const ModalButton = styled.div`
  display: flex;
  margin: 28px 0;
`;

const RobotModal = styled.img`
  z-index: 5;
  height: 183px;
  border-radius: 40px;
`;

const TextModal = styled.div`
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
  width: 742px;

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

const Diamonds = styled.div`
  place-content: center;
  margin-top: 30px;
  margin-right: 8px;
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    color: #ffffff;
    margin-left: 6px;
  }

  > p {
    font-size: 16px;
    color: #ffffff;
    margin-left: 6px;
    color: #ffd63d;
  }

  > img {
    margin-left: 5px;
  }
`;

const SellModalButton = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  > div {
    padding: 8px 18px;
    border-radius: 8px;
    margin: 0 25px;
    :hover {
      cursor: pointer;
    }
  }
`;

const SellRobotsWrapper = styled.div`
  line-height: 24px;
  display: flex;
  height: 160px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SellModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 442px;
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

const AcceptSell = styled.div`
  background: green;
  color: #fff;
`;
const NotSell = styled.div`
  background: red;
  color: #fff;
`;

const ReturnButtonWrapper = styled.div`
  width: 78px;

  @media (max-width: 800px) {
    order: 1;
  }
`;

const SelectButtonWrapper = styled.div`
  width: 210px;

  @media (max-width: 800px) {
    order: 2;
    margin: 15px 0;
  }
`;

const MintNowButtonWrapper = styled.div`
  width: 342px;

  @media (max-width: 800px) {
    order: 3;
  }
`;
