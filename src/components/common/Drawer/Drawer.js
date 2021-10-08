import "./Drawer.less";
import { Drawer } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { SHOW_DRAWER, HIDE_DRAWER, drawerState } from "./drawer.reducer";

const DrawerContent = React.forwardRef((props, ref) => {
  // const dispatch = useDispatch();
  // const drawer = useSelector(drawerState);
  // const { name, open } = drawer;

  const [visibleDrawer, setVisibleDrawer] = React.useState(false);
  const [drawerConfig, setDrawerConfig] = React.useState({
    name: "",
    title: "Title",
    width: 320,
    height: 256,
    placement: "right",
    cssClass: "",
    footer: (
      <div
        style={{
          textAlign: "right",
          paddingBottom: 100,
        }}
      >
        {/* <Space>
      <Button onClick={() => setVisibleDrawer(false)}>
        {t("common.cancel")}
      </Button>
      <Button onClick={() => setVisibleDrawer(false)} type="primary">
        {t("common.save")}
      </Button>
    </Space> */}
      </div>
    ),
  });

  React.useEffect(() => {});

  React.useImperativeHandle(ref, () => ({
    toggleDrawer: (_open, newConfig) => {
      setVisibleDrawer(_open);
      setDrawerConfig(newConfig);
    },
  }));

  return (
    <>
      <Drawer
        name={drawerConfig.name}
        title={drawerConfig.title}
        width={drawerConfig.width}
        height={drawerConfig.height}
        placement={drawerConfig.placement} // top,right,bottom,left
        onClose={() => setVisibleDrawer(false)}
        visible={visibleDrawer}
        className={drawerConfig.cssClass}
        bodyStyle={{ paddingBottom: 80 }}
        style={{ marginTop: 50 }}
        footer={drawerConfig.footer}
      >
        {props.children}
      </Drawer>
    </>
  );
});

export default DrawerContent;
