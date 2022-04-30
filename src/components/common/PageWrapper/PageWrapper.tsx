import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useGetProfile } from "../../../hooks/useGetProfile";
import { AdminPage } from "../../../pages/Admin";
import { Faq } from "../../../pages/Faq";
import { Garage } from "../../../pages/Garage";
import { Landing } from "../../../pages/Landing";
import { Loot } from "../../../pages/Loot";
import { Market } from "../../../pages/Market";
import { Seasonpass } from "../../../pages/Seasonpass";
import { Top } from "../../../pages/Top";
import { Context } from "../../../utils/commonFunctions";
import { Footer } from "../../Footer";
import { LeftMenu, TopMenu } from "../../Menu";
import { PassBonuses } from "../../../pages/PassBonuses";
import { ProfileBonuses } from "../../../pages/ProfileBonuses";
import { Spiner } from "../../../pages/SpinerPage";
import { Modal } from "../Modal";
import { ModalAutorization } from "../Modals/ModalAutorization";
import { ModalForgetPassword } from "../Modals/ModalForgetPassword";
import { ModalNewPassword } from "../Modals/ModalNewPassword";
import { ModalProfileSettings } from "../Modals/ModalProfileSettings";
import { ModalSendTokens } from "../Modals/ModalSendTokens";
import { ModalSettingLanguage } from "../Modals/ModalSettingLanguage";
import { ModalSignIn } from "../Modals/ModalSignIn";
import { SnackBar } from "../SnackBar";

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
            <Landing setAuth={setIsAuth} />
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
                        <ProfileBonuses
                          profile={data.data.userInfo}
                          isOpen={() => setVisibleSettingsLanguage(true)}
                        />
                      )}
                    />
                    <Route
                      path={"/garage/:garagePageNumber"}
                      render={() => (
                        <Garage
                          garageCount={data?.data.userInfo.garage_count}
                          wallet={data?.data.userInfo.wallet}
                        />
                      )}
                    />
                    <Route
                      path={"/loot/:pageNumber"}
                      render={() => (
                        <Spiner
                          balance={data?.data.userInfo.balance || 0}
                          spins={data.data.spins}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/loot"}
                      render={() => (
                        <Loot
                          balance={data?.data.userInfo.balance || 0}
                          countCase={
                            data.data.spins ? data.data.spins.length : 0
                          }
                          freeBox={data.data.spins}
                        />
                      )}
                    />
                    <Route
                      path={"/market/:marketPageNumber"}
                      render={() => (
                        <Market
                          balance={data?.data.userInfo.balance || 0}
                          countCase={
                            data.data.spins
                              ? data.data.spins.filter(i => i.is_used === 0)
                                  .length
                              : 0
                          }
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/seasonpass"}
                      render={() => (
                        //<Seasonpass lvl={(data && +data.data.level) || 0} />
                        <Seasonpass
                          lvl={2}
                          tickets={data.data.userInfo.tickets}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/progress"}
                      render={() => (
                        //<PassBonuses lvl={(data && +data.data.level) || 0} />
                        <PassBonuses profile={data.data.userInfo} />
                      )}
                    />
                    <Route path={"/faq"} component={Faq} />
                    <Route path={"/top"} component={Top} />
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
