import "react-quill/dist/quill.snow.css";
import React from "react";
import { objectExtension } from "@utils/helpers";
import {
  Col,
  Space,
  Input,
  Form,
  Select,
  Radio,
  Checkbox,
  Cascader,
  DatePicker,
} from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import FloatLabel from "@components/common/Forms/FloatLabel";
import TextEditor from "@components/common/Forms/TextEditor";
import TreeViewSelect from "@components/common/Forms/TreeViewSelect";
import moment from "moment";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const defaultDateFormat = "YYYY-MM-DD";

const regexEditor = /<p><br><\/p>/g;

const RenderFieldForm = ({ metadata, formik, renderName = "" }) => {
  const builder = (individualConfig) => {
    const { type, label, field, options, usePrefix, dateFormat } =
      individualConfig;
    const key = individualConfig.id;
    const formatDate = dateFormat || defaultDateFormat;

    // const touched = formik.touched[field];
    //const submitted = formik.submitCount > 0;
    const errorMessage = objectExtension.getValueObjects(
      formik,
      "errors." + field
    );
    const hasError = errorMessage !== undefined;

    let initialValues = objectExtension.getValueObjects(
      formik,
      "values." + field
    );
    initialValues = isNaN(initialValues) ? initialValues : initialValues + "";

    // const submittedError = hasError && submitted;
    // const touchedError = hasError && touched;
    const onInputChange = ({ target: { value } }) => {
      const text = value.replace(regexEditor, "");

      formik.setFieldValue(field, text);
      // setTextVal(text);
    };

    const onChange = (value) => {
      if (individualConfig.onChange instanceof Function) {
        individualConfig.onChange(value);
      }

      const text = type === "editor" ? value.replace(regexEditor, "") : value;
      formik.setFieldValue(field, text);
      // setInitialValues(text);
    };

    const onChangeDateTime = (dateMoment, dateString) => {
      formik.setFieldValue(field, dateString);
    };

    const onBlur = () => formik.setFieldTouched(field, true);

    switch (type) {
      case "text":
      case "password":
      case "email":
      case "number":
      case "hidden":
        return (
          <React.Fragment key={key}>
            <RenderFieldContainer config={individualConfig}>
              {/* <FloatLabel
                label={label}
                value={initialValues}
                className={usePrefix !== undefined ? "affix-wrapper" : ""}
              > */}
              <FormItem
                name={field}
                // label={label}
                className="group-floating-label"
                hasFeedback
                validateStatus={
                  // validating/error/success/warning/
                  hasError
                    ? individualConfig.validateStatus !== undefined
                      ? individualConfig.validateStatus
                      : "error"
                    : ""
                }
                help={hasError ? errorMessage : individualConfig.helperText}
              >
                <RenderInputField
                  name={field}
                  type={type}
                  prefix={usePrefix !== undefined ? usePrefix : ""}
                  onChange={onInputChange}
                  onBlur={onBlur}
                  required={individualConfig.required}
                  autoFocus={individualConfig.autoFocus}
                  allowClear
                  formik={formik}
                  className="form-control"
                  suffix={
                    <label className="floating-label" htmlFor={field}>
                      {label}
                    </label>
                  }
                />
              </FormItem>
              {/* </FloatLabel> */}
            </RenderFieldContainer>
          </React.Fragment>
        );

      case "textarea":
        return (
          <React.Fragment key={key}>
            <RenderFieldContainer config={individualConfig}>
              <FloatLabel
                label={label}
                value={initialValues}
                className={usePrefix !== undefined ? "affix-wrapper" : ""}
              >
                <FormItem
                  name={field}
                  hasFeedback
                  validateStatus={
                    // validating/error/success/warning/
                    hasError
                      ? individualConfig.validateStatus !== undefined
                        ? individualConfig.validateStatus
                        : "error"
                      : ""
                  }
                  help={hasError ? errorMessage : individualConfig.helperText}
                >
                  <RenderInputField
                    name={field}
                    type={type}
                    prefix={usePrefix !== undefined ? usePrefix : ""}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    required={individualConfig.required}
                    autoFocus={individualConfig.autoFocus}
                    allowClear
                    formik={formik}
                    className="form-control"
                  />
                </FormItem>
              </FloatLabel>
            </RenderFieldContainer>
          </React.Fragment>
        );

      case "editor":
        return (
          <React.Fragment key={key}>
            <RenderFieldContainer config={individualConfig}>
              <FloatLabel
                label={label}
                value={initialValues || "<p><br></p>"}
                className={usePrefix !== undefined ? "affix-wrapper" : ""}
              >
                <RenderFormItem
                  name={field}
                  formik={formik}
                  className="quill_style"
                >
                  <TextEditor
                    name={field}
                    className="form-control"
                    autoFocus={individualConfig.autoFocus}
                    value={initialValues || "<p><br></p>"}
                    onChange={onChange}
                  />
                </RenderFormItem>
              </FloatLabel>
            </RenderFieldContainer>
          </React.Fragment>
        );

      case "select":
        //check & set options selected
        const modeSelect =
          individualConfig.mode !== undefined ? individualConfig.mode : "";

        if (initialValues === "" && modeSelect === "multiple")
          initialValues = [];

        return (
          <React.Fragment key={key}>
            <RenderFieldContainer config={individualConfig}>
              <FloatLabel
                label={label}
                value={initialValues}
                className={usePrefix !== undefined ? "affix-wrapper" : ""}
              >
                <FormItem
                  name={field}
                  hasFeedback
                  valuePropName={
                    individualConfig.valuePropName === undefined
                      ? "option"
                      : individualConfig.valuePropName
                  }
                  validateStatus={
                    // validating/error/success/warning/
                    hasError
                      ? individualConfig.validateStatus !== undefined
                        ? individualConfig.validateStatus
                        : "error"
                      : ""
                  }
                  help={hasError ? errorMessage : individualConfig.helperText}
                >
                  <Select
                    mode={modeSelect}
                    id={individualConfig.id}
                    name={field}
                    value={initialValues}
                    onBlur={onBlur}
                    onChange={onChange}
                    maxTagCount="responsive"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    className="form-control"
                    allowClear
                    disabled={individualConfig.disabled}
                    // defaultActiveFirstOption={options.length === 1}
                    // notFoundContent={loadingSpace ? <Spin size="small" /> : "no found"}
                    // showSearch
                  >
                    {options &&
                      options.map((opt, index) => {
                        return (
                          <Select.Option key={key + index} value={opt.value}>
                            {opt.text}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </FormItem>
              </FloatLabel>
            </RenderFieldContainer>
          </React.Fragment>
        );

      case "treeselect":
        return (
          <React.Fragment key={key}>
            <RenderFieldContainer config={individualConfig}>
              <FloatLabel
                label={label}
                value={initialValues}
                className={usePrefix !== undefined ? "affix-wrapper" : ""}
              >
                <FormItem
                  name={field}
                  hasFeedback
                  valuePropName={"treeselect"}
                  validateStatus={
                    // validating/error/success/warning/
                    hasError
                      ? individualConfig.validateStatus !== undefined
                        ? individualConfig.validateStatus
                        : "error"
                      : ""
                  }
                  help={hasError ? errorMessage : individualConfig.helperText}
                >
                  <TreeViewSelect
                    datasource={individualConfig.datasource}
                    value={initialValues}
                    onChange={onChange}
                  />
                </FormItem>
              </FloatLabel>
            </RenderFieldContainer>
          </React.Fragment>
        );

      case "cascader":
        return (
          <React.Fragment key={key}>
            <RenderFieldContainer config={individualConfig}>
              <FloatLabel
                label={label}
                value={initialValues}
                className={usePrefix !== undefined ? "affix-wrapper" : ""}
              >
                <FormItem
                  name={field}
                  hasFeedback
                  valuePropName
                  validateStatus={
                    // validating/error/success/warning/
                    hasError
                      ? individualConfig.validateStatus !== undefined
                        ? individualConfig.validateStatus
                        : "error"
                      : ""
                  }
                  help={hasError ? errorMessage : individualConfig.helperText}
                >
                  <Cascader
                    options={options}
                    onChange={onChange}
                    changeOnSelect
                    placeholder={individualConfig.placeholder || ""}
                  />
                </FormItem>
              </FloatLabel>
            </RenderFieldContainer>
          </React.Fragment>
        );

      // case "radio":
      //   console.log(initialValues);
      //   return (
      //     <React.Fragment key={key}>
      //       <RenderFieldContainer config={individualConfig}>
      //         <FormItem
      //           name={field}
      //           valuePropName="checked"
      //           validateStatus={
      //             // validating/error/success/warning/
      //             hasError
      //               ? individualConfig.validateStatus !== undefined
      //                 ? individualConfig.validateStatus
      //                 : "error"
      //               : ""
      //           }
      //         >
      //           <Radio.Group
      //             value={initialValues}
      //             onChange={onChange}
      //             className="form-control"
      //           >
      //             <Space direction={individualConfig.direction || "horizontal"}>
      //               {options &&
      //                 options.map((opt) => {
      //                   return (
      //                     <React.Fragment key={Helpers.generateKey()}>
      //                       <Col xs={24}>
      //                         <Radio value={opt.value}>{opt.text}</Radio>
      //                       </Col>
      //                     </React.Fragment>
      //                   );
      //                 })}
      //             </Space>
      //           </Radio.Group>
      //         </FormItem>
      //       </RenderFieldContainer>
      //     </React.Fragment>
      //   );

      // case "checkbox":
      //   return (
      //     <React.Fragment key={key}>
      //       <RenderFieldContainer config={individualConfig}>
      //         <FloatLabel
      //           label={label}
      //           value={initialValues}
      //           className={usePrefix !== undefined ? "affix-wrapper" : ""}
      //         >
      //           <FormItem
      //             name={field}
      //             hasFeedback
      //             valuePropName="option"
      //             validateStatus={
      //               // validating/error/success/warning/
      //               hasError
      //                 ? individualConfig.validateStatus !== undefined
      //                   ? individualConfig.validateStatus
      //                   : "error"
      //                 : ""
      //             }
      //             help={hasError ? errorMessage : individualConfig.helperText}
      //           >
      //             <Select
      //               mode={
      //                 individualConfig.mode !== undefined
      //                   ? individualConfig.mode
      //                   : ""
      //               }
      //               id={individualConfig.id}
      //               name={field}
      //               value={initialValues}
      //               onBlur={onBlur}
      //               onChange={onChange}
      //               className="form-control"
      //               allowClear
      //               defaultActiveFirstOption={options.length === 1}
      //               disabled={individualConfig.disabled}
      //               // notFoundContent={loadingSpace ? <Spin size="small" /> : "no found"}
      //               // showSearch
      //             >
      //               {options &&
      //                 options.map((opt) => (
      //                   <Select.Option key={opt.value} value={opt.value}>
      //                     {opt.text}
      //                   </Select.Option>
      //                 ))}
      //             </Select>
      //           </FormItem>
      //         </FloatLabel>
      //       </RenderFieldContainer>
      //     </React.Fragment>
      //   );

      case "date":
        const dateString =
          initialValues !== "" ? moment(initialValues, formatDate) : "";

        return (
          <React.Fragment key={key}>
            <React.Fragment key={key}>
              <RenderFieldContainer config={individualConfig}>
                <FloatLabel
                  label={label + " (" + formatDate + ")"}
                  value={dateString}
                  className={usePrefix !== undefined ? "affix-wrapper" : ""}
                >
                  <FormItem
                    hasFeedback
                    valuePropName
                    validateStatus={
                      // validating/error/success/warning/
                      hasError
                        ? individualConfig.validateStatus !== undefined
                          ? individualConfig.validateStatus
                          : "error"
                        : ""
                    }
                    help={hasError ? errorMessage : individualConfig.helperText}
                  >
                    <DatePicker
                      name={field}
                      placeholder=""
                      value={dateString}
                      format={dateFormat}
                      className="form-control"
                      showTime={individualConfig.showTime || false}
                      onChange={onChangeDateTime}
                    />
                  </FormItem>
                </FloatLabel>
              </RenderFieldContainer>
            </React.Fragment>
          </React.Fragment>
        );

      case "array":
        return (
          <React.Fragment key={key}>
            <RenderFieldForm
              metadata={individualConfig.children || []}
              formik={formik}
            />
          </React.Fragment>
        );

      default:
        return <div key={key}>Unsupported field</div>;
    }
  };

  return (
    <>
      {renderName === ""
        ? metadata.map((c) => {
            return builder(c);
          })
        : metadata
            .filter((f) => f.renderName === renderName)
            .map((c) => {
              return builder(c);
            })}
    </>
  );
};

export default RenderFieldForm;

//#region extension
const RenderFieldContainer = (props) => {
  const { config } = props;

  if (config.type === "hidden") {
    return <div className={config.className}>{props.children}</div>;
  }

  return (
    <Col xs={config.xs || 24} sm={config.sm || 24} className="field-container">
      {props.children}
    </Col>
  );
};

const RenderInputField = (props) => {
  const formik = props.formik;

  // set input focus
  const inputElement = React.useRef(null);

  React.useEffect(() => {
    if (inputElement.current && props.autoFocus) {
      inputElement.current.select();
    }
  }, [inputElement.current]);

  let defaultValue = objectExtension.getValueObjects(
    formik,
    "values." + props.name
  );
  defaultValue = isNaN(defaultValue) ? defaultValue : defaultValue + "";

  switch (props.type) {
    case "password":
      return <Input.Password {...props} value={defaultValue} />;

    case "textarea":
      return <Input.TextArea {...props} value={defaultValue} rows={4} />;

    default:
      return <Input {...props} ref={inputElement} value={defaultValue} />;
  }
};

const RenderFormItem = (props) => {
  const { name, formik, className, useAntd } = props;

  const errorMessage = objectExtension.getValueObjects(
    formik,
    "errors." + name
  );
  const hasError = errorMessage !== undefined;

  const classFormItem = "ant-row ant-form-item " + className;
  const classError =
    classFormItem +
    " ant-form-item-with-help ant-form-item-has-feedback ant-form-item-has-error";

  if (useAntd)
    return (
      <>
        <FormItem
          name={field}
          hasFeedback
          valuePropName={props.valuePropName}
          validateStatus={
            // validating/error/success/warning/
            hasError
              ? props.validateStatus !== undefined
                ? props.validateStatus
                : "error"
              : ""
          }
          help={hasError ? errorMessage : props.helperText}
        >
          {props.children}
        </FormItem>
      </>
    );
  else
    return (
      <div className={hasError ? classError : classFormItem}>
        <div className="ant-col ant-form-item-control">
          <div className="ant-form-item-control-input">
            <div className="ant-form-item-control-input-content">
              {props.children}
            </div>
            {hasError ? (
              <span className="ant-form-item-children-icon">
                <CloseCircleFilled />
              </span>
            ) : (
              <></>
            )}
          </div>
          {hasError ? (
            <div className="ant-form-item-explain ant-form-item-explain-error">
              <div role="alert">{errorMessage}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
};
//#endregion
