import "./Header.less";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { hooksInstance } from "@utils/helpers";
import { CURRENT_MODULES } from "@app/routes";
//#region ant design
import { Row, Col, Typography, Menu, Space, Avatar } from "antd";
import { LogoutOutlined, DingdingOutlined } from "@ant-design/icons";
const { Title } = Typography;
//#endregion
// //#region formik
// // import { useFormik } from "formik";
// // import { siteSchema } from "@schema/site";
// //#endregion
// //#region redux
import { useDispatch, useSelector } from "react-redux";
import { STEPSNAV_INITIAL } from "@components/common/StepsNav/stepsnav.reducer";
import {
  SIGN_OUT,
} from "@redux/ui/survey/user_answer.reducer";

//#endregion
const Header = (props) => {
  //#region declares variables
  const { t } = useTranslation();
  const module = CURRENT_MODULES();
  const router = hooksInstance.useRouter();
  const history = useHistory();
  const dispatch = useDispatch();
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    if (!localStorage.getItem(module)) router.push("/" + module + "/login");
  }, []);
  //#endregion

  //#region callback event
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(STEPSNAV_INITIAL());
    dispatch(SIGN_OUT());
    history.push("/survey/login");
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
              <Avatar size={35} icon={<DingdingOutlined />} />
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
              {localStorage.getItem(module) ? (
                <Menu.Item key="signout" icon={<LogoutOutlined />}>
                  <Link to="#" onClick={handleSignOut}>
                    {t("signin.signout")}
                  </Link>
                </Menu.Item>
              ) : (
                <></>
              )}
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
