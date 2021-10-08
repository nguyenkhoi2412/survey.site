import "./FiltersBar.less";
import { useTranslation, Trans } from "react-i18next";
import FloatLabel from "@components/common/Forms/FloatLabel";
import { Row, Col, Select } from "antd";
const { Option } = Select;

const FiltersBar = ({ filterlist = [] }) => {
  const { t } = useTranslation();

  // filterlist = [{
  //   id: "cate"
  // }]

  return (
    <>
      <Col xs={24} className="filter-container">
        <Row gutter={[16, 16]}>
          {filterlist.map((sel) => {
            <Col xs={8} sm={8} md={6} lg={4} className="filter-item">
              <FloatLabel
                label={t("site.selecttype")}
                value={["1", "6"]}
                className="field-container"
              >
                <Select
                  name="type_ref"
                  value={["1", "6"]}
                  mode="multiple"
                  allowClear
                  maxTagCount="responsive"
                >
                  <Option value="1">Not Identified</Option>
                  <Option value="2">Closed</Option>
                  <Option value="3">Communicated</Option>
                  <Option value="4">Identified</Option>
                  <Option value="5">Resolved</Option>
                  <Option value="6">Cancelled</Option>
                </Select>
              </FloatLabel>
            </Col>;
          })}
        </Row>
      </Col>
    </>
  );
};

export default FiltersBar;
