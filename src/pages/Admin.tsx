import { useEffect } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { AdminDetails } from "../components/AdminDetails";
import { AdminLootBox } from "../components/AdminLootBox";
import { AdminEditCase } from "../components/AdminLootBox/AdminEditCase";
import logoImg from "../assets/img/logo.svg";
import { AdminLinkMenu } from "../components/common/LinkMenu/LinkMenu";
import { AdminMarket } from "../components/AdminMarket";

type adminLinkPagesType = {
  title: "details" | "lootboxes" | "market";

  path: string;
};

export const linkPages: adminLinkPagesType[] = [
  { title: "details", path: "/admin/details" },
  { title: "lootboxes", path: "/admin/lootboxes/1" },
  { title: "market", path: "/admin/market/1" },
];

const AdminPage = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    location.pathname === "/admin" && history.push("/admin/details");
  }, [history, location]);

  return (
    <AdminPageWrapper>
      <TopMenu>
        <Logo onClick={() => history.push("/")}>
          <img src={logoImg} alt="" />
        </Logo>
      </TopMenu>
      <LeftMenu>
        {linkPages.map(link => (
          <LinkContainer key={link.title}>
            <AdminLinkMenu
              path={link.path}
              active={
                link.path === location.pathname ||
                location.pathname.includes(link.title)
              }
              title={link.title}
            />
          </LinkContainer>
        ))}
      </LeftMenu>
      <AdminContentWrapper>
        <Route exact path={"/admin/details"} component={AdminDetails} />
        <Route
          path={"/admin/market/:marketPageNumber"}
          component={AdminMarket}
        />
        <Route
          path={"/admin/lootbox/:pageId/case/:caseId"}
          component={AdminEditCase}
        />
        <Route path={"/admin/lootboxes/:pageId"} component={AdminLootBox} />
      </AdminContentWrapper>
    </AdminPageWrapper>
  );
};

export default AdminPage;

const AdminPageWrapper = styled.div``;

const AdminContentWrapper = styled.div`
  margin-top: 90px;
  margin-left: 90px;
  min-height: calc(100vh - 90px);
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

const TopMenu = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  height: 90px;
  left: 0;
  background: #0b1014;
`;

const LeftMenu = styled.div`
  position: fixed;
  top: 90px;
  width: 90px;
  height: calc(100vh - 90px);
  left: 0;
  background: #0b1014;
`;

const Logo = styled.div`
  height: 100%;
  padding: 0 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 162px;
  box-sizing: border-box;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  margin-top: 54px;

  :first-child {
    margin-top: 34px;
  }
`;
