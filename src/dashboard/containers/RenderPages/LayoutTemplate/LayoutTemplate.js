import "./LayoutTemplate.less";
import React from "react";
import { Layout, Row } from "antd";
import { hooksInstance } from "@utils/helpers";
import { CURRENT_MODULES } from "@app/routes";
import { useSelector } from "react-redux";
import { authState } from "@redux/providers/auth.reducer";

import Header from "@dashboard/modules/_Layout/Header";
import Footer from "@dashboard/modules/_Layout/Footer";
import MainContainer from "@dashboard/containers/RenderPages/MainContainer";

const LayoutTemplate = () => {
  //! Redirect login page if user dont login
  const auth = useSelector(authState);
  const module = CURRENT_MODULES();
  const router = hooksInstance.useRouter();

  React.useEffect(() => {
    if (!localStorage.getItem(module)) router.push("/" + module + "/login");
  }, [auth]);

  return (
    <React.Fragment>
      <Layout className="layout dashboard">
        <Row
          justify="center"
          align="middle"
          className="wrapper"
          // style={{ padding: 16 }}
        >
          <Header logo="Survey Management System" />
          <Layout className="container splitpane h-100">
            {localStorage.getItem(module) ? <MainContainer /> : ""}
          </Layout>
          <Footer />
        </Row>
      </Layout>
    </React.Fragment>
  );
};

export default LayoutTemplate;
