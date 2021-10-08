import "./Header.less";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
//#region ant design
import { Row, Col, Typography, Menu, Space } from "antd";
import {
  DashboardOutlined,
  ProfileOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
//#endregion
// //#region formik
// // import { useFormik } from "formik";
// // import { siteSchema } from "@schema/site";
// //#endregion
// //#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_SIDER,
  siderState,
} from "@redux/utils/shared.reducer";
import { SIGN_OUT } from "@redux/providers/auth.reducer";
// import { localeState } from "@redux/providers/site.reducer";
// import { UPDATE_MENU_ACTIVE } from "@redux/utils/currentMenu.reducer";

//#endregion
const Header = (props) => {
  //   //#region declares variables
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const siderReducer = useSelector(siderState);
  //   const site = useSelector(siteState);
  //   const language = useSelector(localeState);
  //   //#endregion
  //   //#region useHooks
  //   React.useEffect(() => {
  //     if (site.d._id > 0) {
  //       const temptype = site.d.types.filter((t) => t.default_active == true);
  //       // set menu top active
  //       if (temptype.length)
  //         dispatch(
  //           UPDATE_MENU_ACTIVE({ topMenu: temptype[0]._id, childMenu: "" })
  //         );
  //     }
  //   }, [site.d._id]);
  //   //#endregion
  //#region callback event
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(SIGN_OUT());
    history.push("/dashboard/login");
  };
  //#endregion
  //   //#region render html content
  //   const renderButtonType = site.d.types.map((t) => {
  //     if (t.sort > 0) {
  //       return (
  //         <Button key={t._id} color="inherit">
  //           {t.name[language.code]}
  //         </Button>
  //       );
  //     }
  //   });
  //#region collapsed trigger sidebar
  const collapsedSidebar = siderReducer.collapsed;

  const toggleCollapsedSidebar = () => {
    dispatch(TOGGLE_SIDER(!collapsedSidebar));
  };
  //#endregion

  const [currentKey, setCurrentKey] = React.useState({
    current: "dashboard",
  });
  const { current } = currentKey;

  return (
    <>
      <header className="header">
        <Row justify="center" align="middle" className="container">
          <Col xs={8} className="logo">
            <Space direction="horizontal">
              {React.createElement(
                collapsedSidebar ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger-sider",
                  onClick: toggleCollapsedSidebar,
                }
              )}
              <Title level={4} className="logo-text">
                {props.logo}
              </Title>
            </Space>
          </Col>
          <Col xs={16}>
            <Menu
              // onClick={this.handleClick}
              selectedKeys={[current]}
              mode="horizontal"
            >
              <Menu.Item key="signout" icon={<LogoutOutlined />}>
                <Link to="#" onClick={handleSignOut}>
                  {t("signin.signout")}
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="profile" icon={<ProfileOutlined />}>
                <Link to="/profile">Profile</Link>
              </Menu.Item> */}
              <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                <Link to="/dashboard/type">Dashboard</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </header>
      {/* //       <AppBar position="fixed" className="dark">
  //         <Toolbar>
  //           <IconButton edge="start" color="inherit" aria-label="menu">
  //             <MenuIcon />
  //           </IconButton>
  //           <Typography variant="h6" noWrap>
  //             {props.logo}
  //           </Typography>
  //           <Typography component="div" className="settings">
  //             {renderButtonType}
  //             <Button color="inherit" className="signout" onClick={handleSignOut}>
  //               {t("signin.signout")}
  //             </Button>
  //           </Typography>
  //         </Toolbar>
  //       </AppBar> */}
    </>
  );
  //#endregion
};

export default Header;
