import "./ToolbarButtons.less";
import { useTranslation } from "react-i18next";
//#region usHooks/components/helpers
import { Helpers } from "@utils/helpers";
import dashboard from "@dashboard/stores/dashboard";
import DrawerContent from "@components/common/Drawer";
import ActionType from "@dashboard/modules/Type/Forms/Actions";
import ActionCategory from "@dashboard/modules/Categories/Forms/Actions";
import ActionQuestion from "@dashboard/modules/Questions/Forms/Actions";
import ActionSurvey from "@dashboard/modules/Surveys/Forms/Actions";
//#endregion
//#region ant design
import { Space, Button, Modal, Alert } from "antd";
//#endregion

const ToolbarButtons = (props) => {
  //#region declare variables
  const { t } = useTranslation();
  const drawerRef = React.useRef();
  const renderToolbars = dashboard.renderToolbars(props.type);
  //#endregion

  const components = {
    actionType: <ActionType />,
    actionCategory: <ActionCategory />,
    actionQuestion: <ActionQuestion />,
    actionSurveys: <ActionSurvey />
  };

  const [isModalConfirmVisible, setIsModalConfirmVisible] =
    React.useState(false);

  const [modalConfirm, setModalConfirm] = React.useState({
    type: "info",
    description: "",
  });
  const [renderComponent, setRenderComponent] = React.useState(null);

  const runAction = (dash) => {
    // check call action
    switch (dash.action) {
      case "delete":
        showModalConfirm(dash.callback);
        return;
    }

    const cb = dash.callback;
    if (cb === undefined) return;

    setRenderComponent(components[cb.component]);

    switch (cb.renderType) {
      case "drawer":
        drawerRef.current.toggleDrawer(true, cb);
        break;

      case "modal":
        break;
    }
  };

  //#region modal confirm for delete
  const showModalConfirm = (cb) => {
    setIsModalConfirmVisible(true);
    setModalConfirm({
      description: cb.description,
    });
  };

  const handleConfirmOk = () => {
    setIsModalConfirmVisible(false);
    props.deleteEvent();
  };

  const handleConfirmCancel = () => {
    setIsModalConfirmVisible(false);
  };
  //#endregion

  if (!Helpers.checkIsNotNull(renderToolbars)) return <></>;

  return (
    <Space>
      {renderToolbars.map((b) => {
        if (b.action === "delete") {
          b.disabled = props.selectedRowKeys.length === 0;
        }

        return (
          <Button
            key={b.id}
            name={b.name}
            ghost
            disabled={b.disabled}
            loading={b.loading}
            type={b.variant}
            shape={b.shape}
            icon={b.icon}
            onClick={() => runAction(b)}
          >
            <span>{b.text}</span>
          </Button>
        );
      })}
      <DrawerContent ref={drawerRef}>{renderComponent}</DrawerContent>
      <Modal
        // title={t("common.confirm")}
        visible={isModalConfirmVisible}
        width={320}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        className="confirm"
      >
        <Alert
          description={modalConfirm.description}
          type={modalConfirm.type}
          showIcon
        />
      </Modal>
    </Space>
  );
};

export default ToolbarButtons;
