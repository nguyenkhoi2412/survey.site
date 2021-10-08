import "./SignIn.less";
import React from "react";
//#region useHooks, components, helper
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import _schema from "./_schema";
import RenderFieldForm from "@components/common/Forms/RenderFieldForm";
import { Helpers, hooksInstance } from "@utils/helpers";
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
import { UserOutlined } from "@ant-design/icons";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_SPIN_BACKDROP,
  HIDE_SPIN_BACKDROP,
} from "@components/common/BackdropSpin/backdropSpin.reducer";
import { VALIDATE_USER, authState } from "@redux/providers/auth.reducer";
//#endregion

const { Title } = Typography;
const SignIn = () => {
  //#region declares variables
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const router = hooksInstance.useRouter();
  const user = useSelector(authState);
  const initialValues = _schema.initialValues();
  const dataForm = _schema.dataForm();
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    if (!user.isFetching) {
      dispatch(HIDE_SPIN_BACKDROP());
      setSubmitting(false);
    }

    // show alert message after validate
    if (!user.ok) {
      message.error(user.message, 2.5);
    }

    // redirect to private page if user loggedin
    if (user.authenticated || localStorage.getItem("dashboard")) {
      router.push("/dashboard/types");
    }
  }, [user]);
  //#endregion

  //#region useFormik
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: getYupSchemaFromMetaData(dataForm),
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
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
      <Layout className="signin">
        <Row
          justify="center"
          align="middle"
          className="wrapper"
          style={{ padding: 24 }}
        >
          <Col xs={24} sm={16} md={12} lg={10} xl={8}>
            <Row justify="center" align="middle">
              <Col xs={20} className="paper">
                <Space direction="vertical" align="center">
                  <Avatar size={100} icon={<UserOutlined />} />
                  <Title level={3}>{t("signin.signin")}</Title>
                </Space>
                <Form
                  autoComplete="off"
                  layout="vertical"
                  name="login-form"
                  onFinish={(e) => onFinish(e)}
                  className="form"
                  initialValues={initialValues}
                  scrollToFirstError
                >
                  <RenderFieldForm metadata={dataForm} formik={formik} />
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>{t("signin.rememberme")}</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      {t("signin.forgotpassword")}
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      disabled={submitting}
                    >
                      {t("signin.signin")}
                    </Button>
                    Or <a href="">{t("signin.register")}</a>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </React.Fragment>
  );
};

export default SignIn;
