import "./QuestionTypes.less";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";
//#region useHooks, components, helper
import gVariables from "@stores/shared/variables";
import RenderFieldForm from "@components/common/Forms/RenderFieldForm";
import { useFormik } from "formik";
import { Helpers, objectExtension, stringExtension } from "@utils/helpers";
import { QUESTION_TYPES } from "@stores";
import _schema from "./_schema";
import DynamicInputAnswers from "@dashboard/modules/Questions/Forms/DynamicInputAnswers";
//#endregion
//#region ANT DESIGN
import {
  Row,
  Col,
  Space,
  Form,
  Button,
  message,
  Typography,
  Radio,
  Checkbox,
} from "antd";
import { SaveOutlined, ClearOutlined } from "@ant-design/icons";
const FormItem = Form.Item;
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  QUESTION_INSERT_NEW,
  QUESTION_UPDATE,
  questionState,
} from "@redux/providers/question.reducer";
import React from "react";
//#endregion

const QuestionTypes = (props) => {
  let { data, qTypes, onCloseDrawer } = props;

  const locale = gVariables.locale.default;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const valueState = useSelector(questionState);
  const isEdit = Helpers.checkIsNotNull(data);
  const fieldAnswers = "answers";

  const [showChoice, setShowChoice] = React.useState(false);
  const [singleChoiceValue, setSingleChoiceValue] = React.useState();
  const [multipleChoiceValue, setMultipleChoiceValue] = React.useState();
  //#region useEffect
  React.useEffect(() => {
    // render input answers
    if (isEdit) {
      formik.setFieldValue(fieldAnswers, data.answers);
      qTypes = data.question_type;
    }

    // render review answers
    switch (qTypes.text) {
      case QUESTION_TYPES.SINGLECHOICE:
        if (isEdit) {
          const answersCorrect = data.answers.filter(
            (opt) => opt.correct === true
          );

          setSingleChoiceValue(
            Helpers.checkIsNotNull(answersCorrect) ? answersCorrect[0]._id : ""
          );
        }
        break;

      case QUESTION_TYPES.MULTIPLECHOICE:
        if (isEdit) {
          const arrayAnswers = [];
          data.answers.filter((opt) => {
            if (opt.correct === true) {
              arrayAnswers.push(opt._id);
            }
          });

          setMultipleChoiceValue(arrayAnswers);
        }
        break;
    }
  }, [data]);

  React.useEffect(() => {
    // reset form when change new question type
    handleResetForm();

    // update when change question type
    const tempQTypes = { ...qTypes };
    delete tempQTypes.icon;
    delete tempQTypes.desc;

    formik.setFieldValue("question_type", tempQTypes);

    switch (qTypes.text) {
      case QUESTION_TYPES.SINGLECHOICE:
        setShowChoice(true);
        break;

      case QUESTION_TYPES.MULTIPLECHOICE:
        setShowChoice(true);
        break;

      default:
        setShowChoice(false);
        break;
    }
  }, [qTypes.text]);

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
        onCloseDrawer();
      }
    }
  }, [valueState]);
  //#endregion

  //#region formik
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const initialValues = _schema.initialValues(qTypes, data);
  let dataForm = _schema.dataForm(qTypes);
  const validateSchema = _schema.validateSchema(qTypes);

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

        dispatch(QUESTION_UPDATE(values));
      } else dispatch(QUESTION_INSERT_NEW(values)); // for INSERT NEW
    },
  });

  const handleResetForm = () => {
    document.getElementById("question-types").reset();
    formik.resetForm();
    setEnableValidation(false);
    setSubmitting(false);
  };

  const onSubmit = () => {
    setEnableValidation(true);
    formik.handleSubmit();
  };
  // const handleCloseDrawer = () => {
  //   console.log("questiontype", props);
  //   props.onCloseDrawer();
  // };
  //#endregion

  //render content html
  //#region render review answers
  let renderReviewAnswer = <></>;
  switch (qTypes.text) {
    case QUESTION_TYPES.SINGLECHOICE:
      renderReviewAnswer = (
        <FormItem
          name="single-choice"
          valuePropName="checked"
          className={showChoice ? "" : "none"}
        >
          <Radio.Group
            value={singleChoiceValue}
            onChange={(e) => handleCorrectSingleChoice(e)}
          >
            <Space direction="vertical">
              {formik.values.answers.map((opt, index) => {
                return (
                  <React.Fragment key={Helpers.generateKey() + index}>
                    <Col xs={24}>
                      <Radio value={opt._id}>
                        {stringExtension.render(opt.text, locale.lang)}
                      </Radio>
                    </Col>
                  </React.Fragment>
                );
              })}
            </Space>
          </Radio.Group>
        </FormItem>
      );
      break;

    case QUESTION_TYPES.MULTIPLECHOICE:
      renderReviewAnswer = (
        <FormItem
          name="multiple-choice"
          valuePropName="checked"
          className={showChoice ? "" : "none"}
        >
          <Checkbox.Group
            value={multipleChoiceValue}
            onChange={(checkedValues) =>
              handleCorrectMultipleChoice(checkedValues)
            }
          >
            <Space direction="vertical">
              {formik.values.answers.map((opt, index) => {
                return (
                  <React.Fragment key={Helpers.generateKey() + index}>
                    <Col xs={24}>
                      <Checkbox value={opt._id}>
                        {Helpers.checkIsNotNull(opt.text)
                          ? opt.text[locale.lang]
                          : ""}
                      </Checkbox>
                    </Col>
                  </React.Fragment>
                );
              })}
            </Space>
          </Checkbox.Group>
        </FormItem>
      );
      break;
  }

  const handleCorrectSingleChoice = (e) => {
    setSingleChoiceValue(e.target.value);

    const arrayAnswers = [];
    formik.values.answers.map((a) => {
      arrayAnswers.push({
        ...a,
        correct: a._id === e.target.value,
      });
    });

    formik.setFieldValue(fieldAnswers, arrayAnswers);
  };

  const handleCorrectMultipleChoice = (checkedValues) => {
    setMultipleChoiceValue(checkedValues);

    const arrayAnswers = [];
    formik.values.answers.map((a) => {
      arrayAnswers.push({
        ...a,
        correct: checkedValues.indexOf(a._id) > -1,
      });
    });

    formik.setFieldValue(fieldAnswers, arrayAnswers);
  };
  //#endregion

  return (
    <>
      <Form
        noValidate
        autoComplete="off"
        layout="vertical"
        name="question-types"
        initialValues={initialValues}
        onFinish={() => onSubmit()}
        className="form-container"
        scrollToFirstError
      >
        <Col xs={24} sm={12} md={11}>
          <Typography.Title level={4}>
            {qTypes.text.toUpperCase()}
          </Typography.Title>

          <Row gutter={[16, 0]}>
            <RenderFieldForm metadata={dataForm} formik={formik} />

            {showChoice ? (
              <>
                <DynamicInputAnswers
                  questionType={qTypes}
                  dataAnswers={data && data.answers ? data.answers : []}
                  formik={formik}
                />
              </>
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <Col xs={24}>
              <FormItem className="form-actions">
                <Space>
                  {/* <Button
                    type="secondary"
                    htmlType="button"
                    className="form-button"
                    icon={<CloseOutlined />}
                    // onClick={handleCloseDrawer}
                  >
                    {t("common.cancel")}
                  </Button> */}
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
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={13} className="review-question">
          <Typography.Title level={4}>
            {t("question.review_questions").toUpperCase()}
          </Typography.Title>
          <Row>
            <Col xs={24}>
              <Typography.Title level={5} className="title">
                {objectExtension.getValueObjects(
                  formik,
                  "values.title." + locale.lang
                )}
              </Typography.Title>
              <Typography className="sub_title">
                {objectExtension.getValueObjects(
                  formik,
                  "values.sub_title." + locale.lang
                )}
              </Typography>
              <Typography
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: objectExtension.getValueObjects(
                    formik,
                    "values.desc." + locale.lang
                  ),
                }}
              ></Typography>
              {renderReviewAnswer}
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  );
};

export default QuestionTypes;
