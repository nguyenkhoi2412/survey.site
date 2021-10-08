import "./SignIn.less";
import React from "react";
//#region useHooks, components, helper
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import _schema from "./_schema";
import RenderFieldForm from "@components/common/Forms/RenderFieldForm";
import { Helpers, hooksInstance } from "@utils/helpers";
import gVariables from "@stores/shared/variables";
import ProgressWorking from "@components/common/ProgressWorking";
import { STEPS_STATUS } from "@stores";
import { progressSteps } from "@app/routes/survey";
import StepsNav from "@components/common/StepsNav/StepsNav";
import Header from "@surveys/modules/_Layout/Header";
import Footer from "@surveys/modules/_Layout/Footer";
//#endregion
//#region Ant Design
import {
  Layout,
  Space,
  Avatar,
  Typography,
  Row,
  Col,
  Button,
  message,
  Form,
  Checkbox,
} from "antd";
import { DingdingOutlined } from "@ant-design/icons";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_SPIN_BACKDROP,
  HIDE_SPIN_BACKDROP,
} from "@components/common/BackdropSpin/backdropSpin.reducer";
import {
  VALIDATE_USER,
  userAnswerState,
} from "@redux/ui/survey/user_answer.reducer";
import moment from "moment";
//#endregion

const { Title } = Typography;
const SignIn = () => {
  //#region declares variables
  const { t, i18n } = useTranslation();
  document.title = t("survey.loggin");

  const dispatch = useDispatch();
  const router = hooksInstance.useRouter();
  const user = useSelector(userAnswerState);
  const initialValues = _schema.initialValues();
  const validateSchema = _schema.validateSchema();
  const dataForm = _schema.dataForm();
  //#endregion

  let steps = progressSteps([
    {
      _id: 1,
      title: t("signin.signin"),
      subTitle: "",
      status: STEPS_STATUS.PROCESS,
      description: "",
    },
    {
      _id: 2,
      title: t("survey.chooseyourtest"),
      subTitle: "",
      status: STEPS_STATUS.WAIT,
      description: "",
    },
    {
      _id: 3,
      title: t("survey.completeyourtest"),
      subTitle: "",
      status: STEPS_STATUS.WAIT,
      description: "",
    },
    {
      _id: 4,
      title: t("common.complete"),
      subTitle: "",
      status: STEPS_STATUS.WAIT,
      description: "",
    },
  ]);

  //#region useHooks
  React.useEffect(() => {
    if (!user.isFetching && submitting) {
      dispatch(HIDE_SPIN_BACKDROP());
      setSubmitting(false);
    }

    // show alert message after validate
    if (!user.ok) {
      message.error(user.message, 2.5);
    }

    // redirect to private page if user loggedin
    if (user.authenticated || localStorage.getItem("survey")) {
      router.push("/survey/selections");
    }
  }, [user]);
  //#endregion

  //#region useFormik
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validateSchema,
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      // convert datetime to format default is: YYYY-MM-DD before save
      values.birthday = moment(
        values.birthday,
        gVariables.locale.date_format
      ).format(gVariables.defaultDateFormat);

      setSubmitting(true);
      dispatch(SHOW_SPIN_BACKDROP({}));

      Helpers.simulateNetworkRequest(100).then(() => {
        dispatch(VALIDATE_USER(values));
      });
    },
  });
  //#endregion

  const onFinish = () => {
    setEnableValidation(true);
    formik.handleSubmit();
  };

  return (
    <React.Fragment>
      <Layout className="layout survey">
        <Row justify="center" align="middle" className="wrapper">
          <Header logo={t("survey.onlinesurvey")} />
          <Layout className="container splitpane h-100">
            <Layout.Content>
              <Layout className="steps-container">
                <StepsNav metadata={steps} />
                {user.authenticated ? <ProgressWorking /> : <></>}
              </Layout>
              <Layout className="pane-container">
                <Layout className="signin">
                  <Row
                    justify="center"
                    align="middle"
                    className="wrapper"
                    style={{ padding: 24 }}
                  >
                    <Col xs={24} sm={16} md={14} lg={12} xl={12}>
                      <Row justify="center" align="middle">
                        <Col xs={20} className="paper">
                          <Space align="center" className="great">
                            <Avatar size={65} icon={<DingdingOutlined />} />
                            <Title level={5}>
                              {t("survey.greattoseeagain")}
                            </Title>
                          </Space>
                          <Form
                            autoComplete="off"
                            layout="inline"
                            name="survey-frm-login"
                            onFinish={(e) => onFinish(e)}
                            className="form-container"
                            initialValues={initialValues}
                            scrollToFirstError
                          >
                            <RenderFieldForm
                              metadata={dataForm}
                              formik={formik}
                            />
                            <Col xs={24} className="field-container">
                              <Form.Item>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  className="login-form-button"
                                  disabled={submitting}
                                >
                                  {t("common.next")}
                                </Button>
                              </Form.Item>
                            </Col>
                          </Form>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Layout>
              </Layout>
            </Layout.Content>
          </Layout>
          <Footer />
        </Row>
      </Layout>
    </React.Fragment>
  );
};

export default SignIn;
