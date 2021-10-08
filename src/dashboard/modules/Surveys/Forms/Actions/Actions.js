import "./Actions.less";
import { useTranslation } from "react-i18next";
//#region useHooks, components, helper
import { useFormik } from "formik";
import _schema from "./_schema";
import RenderFieldForm from "@components/common/Forms/RenderFieldForm";
import { Helpers, objectExtension } from "@utils/helpers";
//#endregion
//#region ANT DESIGN
import { Form, Row, Col, Button, message } from "antd";
import { SaveOutlined, ClearOutlined } from "@ant-design/icons";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  SURVEY_INSERT_NEW,
  SURVEY_UPDATE,
  surveyState,
} from "@redux/providers/survey.reducer";
//#endregion

const Action = (props) => {
  //#region init variables
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const valueState = useSelector(surveyState);
  const [isEdit, setIsEdit] = React.useState(props.data !== undefined);
  //#endregion

  //#region useEffect
  React.useEffect(() => {
    // close dialog form when submitted
    if (!valueState.isFetching && submitting) {
      if (valueState.ok) {
        //Show message when insert success
        message.success(valueState.message, 2.5);
      } else {
        //Show message when insert fail
        message.error(valueState.message, 2.5);
      }

      handleResetForm();

      if (isEdit) {
        props.handleCloseDrawer();
      }
    }
  }, [valueState]);
  //#endregion

  //#region formik
  const initialValues = _schema.initialValues(props.data);
  const validateSchema = _schema.validateSchema();
  const dataForm = _schema.dataForm();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validateSchema,
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      if (submitting) return;

      setSubmitting(true);

      // for UPDATE
      if (Helpers.checkIsNotNull(initialValues._id)) {
        values = objectExtension.diffObjects(values, initialValues);
        values._id = initialValues._id;

        dispatch(SURVEY_UPDATE(values));
      } else dispatch(SURVEY_INSERT_NEW(values)); // for INSERT NEW
    },
  });
  //#endregion

  const handleResetForm = () => {
    document.getElementById("frm-survey").reset();
    formik.resetForm();
    setEnableValidation(false);
    setSubmitting(false);
  };

  const onSubmit = () => {
    setEnableValidation(true);
    formik.handleSubmit();
  };

  return (
    <>
      <Form
        noValidate
        autoComplete="off"
        layout="vertical"
        name="frm-survey"
        onFinish={() => onSubmit()}
        className="form-container drawer-right"
        scrollToFirstError
      >
        <Row gutter={[16, 0]}>
          <Col xs={12} sm={12}>
            <RenderFieldForm
              metadata={dataForm}
              formik={formik}
              renderName="survey-t"
            />
          </Col>
          <RenderFieldForm
            metadata={dataForm}
            formik={formik}
            renderName="survey"
          />
        </Row>
        <Form.Item className="form-actions">
          <Button
            type="secondary"
            htmlType="reset"
            className="form-button"
            icon={<ClearOutlined />}
            onClick={handleResetForm}
          >
            {t("common.reset")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="form-button"
            loading={submitting}
            icon={<SaveOutlined />}
          >
            {submitting ? t("common.saving") : t("common.save")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Action;
