import "./LayoutTemplate.less";
import { useTranslation } from "react-i18next";
import { Layout, Row } from "antd";
import { Helpers, hooksInstance } from "@utils/helpers";
import { CURRENT_MODULES } from "@app/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_ANSWER_GET_BY_ID,
  userAnswerState,
} from "@redux/ui/survey/user_answer.reducer";

import Header from "@surveys/modules/_Layout/Header";
import Footer from "@surveys/modules/_Layout/Footer";
import MainContainer from "@surveys/containers/RenderPages/MainContainer";

const LayoutTemplate = () => {
  const { t } = useTranslation();

  //! Redirect login page if user dont login
  const module = CURRENT_MODULES();

  return (
    <React.Fragment>
      <Layout className="layout survey">
        <Row justify="center" align="middle" className="wrapper">
          <Header logo={t("survey.onlinesurvey")} />
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
