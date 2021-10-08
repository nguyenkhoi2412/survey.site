import "./PaneLeft.less";
import React from "react";
import { Link } from "react-router-dom";
import { arrayExtension, hooksInstance } from "@utils/helpers";
//#region ant design
import { Layout, Menu } from "antd";
// import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import dashboard from "@dashboard/stores/dashboard";
import { TOGGLE_SIDER, siderState } from "@redux/utils/shared.reducer";
//#endregion

const PaneLeft = () => {
  const router = hooksInstance.useRouter();

  //#region declares variable
  const dispatch = useDispatch();
  const siderReducer = useSelector(siderState);
  const pathname = router.pathname;
  const secondaryMenu = dashboard.secondaryMenu();
  //#endregion

  // set active left menu
  let pathlink = pathname.split("/").filter((pn) => pn !== "");

  // check & set defaultOpenKeys in menu
  const openKeys = [pathlink[1] + "ment"];
  if (pathlink.length === 2) {
    pathlink = arrayExtension.insert(pathlink, 1, openKeys);
  }

  const selectedKeys = [pathlink[2]];
  const handleOnCollapseResponsive = (collapsed, type) => {
    switch (type) {
      case "responsive":
        dispatch(TOGGLE_SIDER(collapsed));
        break;
    }
  };
  
  // const handleOnBreakPoint = (broken) => {
  //   if(broken) {
  //     dispatch(TOGGLE_SIDER(true));
  //   }
  // };

  //#region render html content
  return (
    <>
      <Layout.Sider
        theme="light"
        className="split left"
        width={250}
        trigger={null}
        collapsible
        collapsed={siderReducer.collapsed}
        collapsedWidth={50}
        breakpoint="md"
        // onBreakpoint={(broken) => handleOnBreakPoint(broken)}
        onCollapse={(collapsed, type) =>
          handleOnCollapseResponsive(collapsed, type)
        }
      >
        {/* {React.createElement(
          collapsedSidebar ? DoubleRightOutlined : DoubleLeftOutlined,
          {
            className: "trigger-sider",
            onClick: toggleCollapsedSidebar,
          }
        )} */}
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
        >
          {secondaryMenu.map((menu) => {
            let renderMenu = <></>;
            if (menu.children && menu.children.length) {
              renderMenu = (
                <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.text}>
                  {menu.children.map((c) => {
                    return (
                      <Menu.Item key={c.key} icon={c.icon}>
                        <Link to={c.path}>{c.text}</Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            } else {
              renderMenu = (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link to={menu.path}>{menu.text}</Link>
                </Menu.Item>
              );
            }
            return (
              <React.Fragment key={Math.random()}>{renderMenu}</React.Fragment>
            );
          })}
        </Menu>
        {/* <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.SubMenu key="sub1" title="Navigation One">
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title="Navigation Two"
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub4"
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </Menu.SubMenu>
        </Menu> */}
      </Layout.Sider>
    </>
  );
  //#endregion
};

export default PaneLeft;
