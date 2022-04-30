import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import loadable from '@loadable/component';
import { useGetProfile } from "../../../hooks/useGetProfile";
import { Context } from "../../../utils/commonFunctions";
import { LeftMenu, TopMenu } from "../../Menu";
import CustomLoader from "../Loader";

const Footer = loadable(() => import('../../Footer'));
const SnackBar = loadable(() => import('../SnackBar'));

const Modal = loadable(() => import('../Modal'));
const ModalAutorization = loadable(() => import('../Modals/ModalAutorization'));
const ModalForgetPassword = loadable(() => import('../Modals/ModalForgetPassword'));
const ModalNewPassword = loadable(() => import('../Modals/ModalNewPassword'));
const ModalProfileSettings = loadable(() => import('../Modals/ModalProfileSettings'));
const ModalSendTokens = loadable(() => import('../Modals/ModalSendTokens'));
const ModalSettingLanguage = loadable(() => import('../Modals/ModalSettingLanguage'));
const ModalSignIn = loadable(() => import('../Modals/ModalSignIn'));

const AdminPage = lazy(() => import('../../../pages/Admin'));
const Faq = lazy(() => import('../../../pages/Faq'));
const Garage = lazy(() => import('../../../pages/Garage'));
const Landing = lazy(() => import('../../../pages/Landing'));
const Loot = lazy(() => import('../../../pages/Loot'));
const Market = lazy(() => import('../../../pages/Market'));
const Seasonpass = lazy(() => import('../../../pages/Seasonpass'));
const Top = lazy(() => import('../../../pages/Top'));
const PassBonuses = lazy(() => import('../../../pages/PassBonuses'));
const ProfileBonuses = lazy(() => import('../../../pages/ProfileBonuses'));
const Spiner = lazy(() => import('../../../pages/SpinerPage'));

export const PageWrapper = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  let token = localStorage.getItem("authToken");
  const { data, isLoading } = useGetProfile(token || "", setIsAuth);
  const location = useLocation();
  useEffect(() => {
    token && setIsAuth(true);
  }, [token]);

  useEffect(() => {
    !data && !isLoading && setIsAuth(false);
  }, [data, isLoading]);

  const [visibleSendTokens, setVisibleSendTokens] = useState<boolean>(false);
  const [visibleSignIn, setVisibleSignIn] = useState<boolean>(false);
  const [visibleProfileSettings, setVisibleProfileSettings] =
    useState<boolean>(false);
  const [visibleAutorization, setVisibleAutorization] =
    useState<boolean>(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState<boolean>(false);
  const [visibleForgetPassword, setVisibleForgetPassword] =
    useState<boolean>(false);

  const [visibleSettingsLanguage, setVisibleSettingsLanguage] =
    useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  return (
    <Switch>
      <Page>
        <Context.Provider value={{ setMessage }}>
          {!isAuth || !data?.data ? (
            <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
              <Landing setAuth={setIsAuth} />
            </Suspense>
          ) : (
            <>
              <Route path={"/admin"} component={AdminPage} />

              {!location.pathname.includes("/admin") && (
                <>
                  <TopMenu
                    profileData={data?.data.userInfo}
                    countCase={
                      data.data.spins
                        ? data.data.spins.filter(i => i.is_used === 0).length
                        : 0
                    }
                    usedFreeBox={
                      data.data.spins.length &&
                        data.data.spins.filter(
                          item => item.lootbox.type === "free",
                        ).length
                        ? !data.data.spins.filter(
                          item => item.lootbox.type === "free",
                        )[0].is_used
                        : false
                    }
                  />
                  <LeftMenu isOpen={() => setVisibleSettingsLanguage(true)} />
                  <PageContent>
                    <Route
                      exact
                      path={"/"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <ProfileBonuses
                            profile={data.data.userInfo}
                            isOpen={() => setVisibleSettingsLanguage(true)}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      path={"/garage/:garagePageNumber"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <Garage
                            garageCount={data?.data.userInfo.garage_count}
                            wallet={data?.data.userInfo.wallet}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      path={"/loot/:pageNumber"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <Spiner
                            balance={data?.data.userInfo.balance || 0}
                            spins={data.data.spins}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path={"/loot"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <Loot
                            balance={data?.data.userInfo.balance || 0}
                            countCase={
                              data.data.spins ? data.data.spins.length : 0
                            }
                            freeBox={data.data.spins}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      path={"/market/:marketPageNumber"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <Market
                            balance={data?.data.userInfo.balance || 0}
                            countCase={
                              data.data.spins
                                ? data.data.spins.filter(i => i.is_used === 0)
                                  .length
                                : 0
                            }
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path={"/seasonpass"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <Seasonpass
                            lvl={2}
                            tickets={data.data.userInfo.tickets}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path={"/progress"}
                      render={() => (
                        <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                          <PassBonuses profile={data.data.userInfo} />
                        </Suspense>
                      )}
                    />
                    <Route path={"/faq"} render={() => (
                      <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                        <Faq />
                      </Suspense>
                    )} />
                    <Route path={"/top"} render={() => (
                      <Suspense fallback={<LoadingScreen> <CustomLoader margin="20px 0 0 30px;" /></LoadingScreen>}>
                        <Top />
                      </Suspense>
                    )} />
                  </PageContent>
                  <Footer />
                </>
              )}

              {visibleSendTokens && (
                <Modal
                  visible={visibleSendTokens}
                  onClose={() => setVisibleSendTokens(false)}
                >
                  <ModalSendTokens
                    visible={visibleSendTokens}
                    onClose={() => setVisibleSendTokens(false)}
                  />
                </Modal>
              )}

              {visibleSignIn && (
                <Modal
                  visible={visibleSignIn}
                  onClose={() => setVisibleSignIn(false)}
                >
                  <ModalSignIn
                    visible={visibleSignIn}
                    onClose={() => setVisibleSignIn(false)}
                  />
                </Modal>
              )}

              {visibleProfileSettings && (
                <Modal
                  visible={visibleProfileSettings}
                  onClose={() => setVisibleProfileSettings(false)}
                >
                  <ModalProfileSettings
                    visible={visibleProfileSettings}
                    onClose={() => setVisibleProfileSettings(false)}
                  />
                </Modal>
              )}

              {visibleAutorization && (
                <Modal
                  visible={visibleAutorization}
                  onClose={() => setVisibleAutorization(false)}
                >
                  <ModalAutorization
                    visible={visibleAutorization}
                    onClose={() => setVisibleAutorization(false)}
                  />
                </Modal>
              )}

              {visibleNewPassword && (
                <Modal
                  visible={visibleNewPassword}
                  onClose={() => setVisibleNewPassword(false)}
                >
                  <ModalNewPassword
                    visible={visibleNewPassword}
                    onClose={() => setVisibleNewPassword(false)}
                  />
                </Modal>
              )}

              {visibleForgetPassword && (
                <Modal
                  visible={visibleForgetPassword}
                  onClose={() => setVisibleForgetPassword(false)}
                >
                  <ModalForgetPassword
                    visible={visibleForgetPassword}
                    onClose={() => setVisibleForgetPassword(false)}
                  />
                </Modal>
              )}

              {visibleSettingsLanguage && (
                <ModalSettingLanguage
                  visible={visibleSettingsLanguage}
                  onClose={() => setVisibleSettingsLanguage(false)}
                  anim={Boolean(data?.data.userInfo.animation)}
                  sound={Boolean(data?.data.userInfo.sound)}
                  language={data.data.userInfo.language}
                />
              )}

              {message && (
                <SnackBar text={message} onClose={() => setMessage("")} />
              )}
            </>
          )}
        </Context.Provider>
      </Page>
    </Switch>
  );
};

const Page = styled.div``;

const PageContent = styled.div`
  margin-top: 90px;
  margin-left: 90px;
  width: calc(100% - 90px);
  min-height: calc(100vh - 90px - 170px);
  background: #0a0b0d;

  @media (max-width: 700px) {
    margin-top: 60px;
    margin-left: 0;
    width: 100%;
  }
`;

const LoadingScreen = styled.div`
height: 100vh;
width: 100%;
background: #050b1c;
display: flex;
justify-content: center;
align-items: center;
`;
