import "./Actions.less";
import { useTranslation } from "react-i18next";
//#region useHooks, components, helper
import dbStore from "@dashboard/stores/dashboard";
import QuestionTypes from "@dashboard/modules/Questions/Forms/QuestionTypes";
import { Helpers } from "@utils/helpers";
//#endregion
//#region ANT DESIGN
import { Layout, Row, Space, Button, Tooltip } from "antd";
//#endregion
//#region redux
import React from "react";
//#endregion

const Actions = (props) => {
  const { data, onCloseDrawer } = props;
  //#region init variables
  const { t } = useTranslation();
  const questionTypes = dbStore.questionTypes();
  const [formTypes, setFormTypes] = React.useState(questionTypes.filter((q) => q._id === 3)[0]);
  //#endregion
  
  //#region useEffect
  React.useEffect(() => {
    if (Helpers.checkIsNotNull(data)) {
      setFormTypes(data.question_type);
    }
  }, [data]);
  //#endregion

  //#region sider
  const [collapsedSider, setCollapsedSider] = React.useState(false);
  const handleOnCollapseResponsive = (collapsed, type) => {
    switch (type) {
      case "responsive":
        setCollapsedSider(collapsed);
        break;
    }
  };
  //#endregion

  const handleCloseDrawer = () => {
    props.onCloseDrawer();
  };

  return (
    <>
      <Layout>
        <Layout.Sider
          theme="light"
          className="split left"
          width={155}
          trigger={null}
          collapsible
          collapsed={collapsedSider}
          collapsedWidth={45}
          breakpoint="md"
          // onBreakpoint={(broken) => handleOnBreakPoint(broken)}
          onCollapse={(collapsed, type) =>
            handleOnCollapseResponsive(collapsed, type)
          }
        >
          <Space className="q-types-container" direction="vertical">
            {questionTypes.map((menu) => {
              return (
                <Tooltip key={menu._id} title={menu.text} placement="left">
                  <Button
                    name={menu._id}
                    type="primary"
                    ghost
                    // loading={b.loading}
                    icon={menu.icon}
                    onClick={() => setFormTypes(menu)}
                    className={formTypes._id === menu._id ? "selected" : ""}
                  >
                    {menu.text}
                  </Button>
                </Tooltip>
              );
            })}
          </Space>
        </Layout.Sider>
        <Layout.Content>
          <Row gutter={[16, 16]}>
            <QuestionTypes
              data={data}
              qTypes={formTypes}
              onCloseDrawer={onCloseDrawer}
            />
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Actions;
