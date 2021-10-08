import "react-quill/dist/quill.snow.css";
import React from "react";
import { Helpers, objectExtension } from "@utils/helpers";
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
import moment from "moment";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const defaultDateFormat = "YYYY-MM-DD";

const RenderField = ({ metadata }) => {
  const builder = (individualConfig) => {
    const { type, label, field, value, options, usePrefix, dateFormat } =
      individualConfig;

    const [checkedValue, setCheckedValue] = React.useState();
    const onChange = (e) => {
      const { target } = e;
      setCheckedValue(target.value);

      if (individualConfig.onChange instanceof Function) {
        individualConfig.onChange(target);
      }
    };

    switch (type) {
      case "radio":
        React.useEffect(() => {
          setCheckedValue(value || "");
        }, []);

        return (
          <React.Fragment>
            <RenderFieldContainer config={individualConfig}>
              <FormItem
                valuePropName="checked"
                className={individualConfig.cssClass}
              >
                <Radio.Group
                  name={field}
                  value={checkedValue}
                  onChange={(e) => onChange(e)}
                  className="form-control"
                >
                  <Space direction="vertical">
                    {options.map((opt) => {
                      return (
                        <React.Fragment key={Helpers.generateKey()}>
                          <Col xs={24}>
                            <Radio value={opt.value}>{opt.text}</Radio>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </FormItem>
            </RenderFieldContainer>
          </React.Fragment>
        );
    }
  };

  return builder(metadata);
};

export default RenderField;

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
//#endregion
