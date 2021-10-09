import "./Type.less";
import { useTranslation, Trans } from "react-i18next";
//#region components/helpers
import gVariables from "@stores/shared/variables";
import ToolbarButtons from "@dashboard/components/ToolbarButtons";
import RenderTable from "@components/common/RenderTable";
import DrawerContent from "@components/common/Drawer";
import ActionType from "@dashboard/modules/Type/Forms/Actions";
//#endregion
//#region ant design
import { Row, Col, message, Space, Tag, Popconfirm } from "antd";
//#endregion
//#region Redux
import { useDispatch, useSelector } from "react-redux";
import {
  TYPE_GET_BY_PAGENO,
  TYPE_DELETE,
  typeState,
} from "@redux/providers/type.reducer";
import { siteState, localeState } from "@redux/providers/site.reducer";
import { Helpers } from "@utils/helpers";
//#endregion

const Type = () => {
  //#region init data
  const { t } = useTranslation();
  const site = useSelector(siteState);
  const locale = useSelector(localeState);
  const dispatch = useDispatch();
  const dataStates = useSelector(typeState);
  const [tableStates, setTableStates] = React.useState({
    stateChange: false,
    pagination: {
      current: 1,
      pageSize: gVariables.pageSize,
      total: 0,
    },
    filteredInfo: {
      site_ref: site.d._id,
    },
    sortedInfo: {},
  });
  //#endregion

  const fetchDataTables = () => {
    const { pagination, filteredInfo, sortedInfo } = tableStates;

    dispatch(
      TYPE_GET_BY_PAGENO({
        pageno: pagination.current,
        pagesize: pagination.pageSize,
        query: {
          sortCriteria: sortedInfo,
          filterCriteria: filteredInfo,
        },
      })
    );
  };

  //#region useEffect
  // React.useEffect(() => {
  //   fetchDataTables();
  // }, []);

  React.useEffect(() => {
    setTableStates({
      ...tableStates,
      pagination: {
        ...tableStates.pagination,
        total: dataStates.total,
      },
    });

    //Show message when delete
    if (!dataStates.isFetching && dataStates.action === gVariables.DELETE) {
      if (dataStates.ok) {
        //Show message when insert success
        message.success(dataStates.message, 2.5);

        setRowKeys([]);
      } else {
        //Show message when insert fail
        message.error(dataStates.message, 2.5);
      }
    }
  }, [dataStates]);

  // Effect when table state changed
  React.useEffect(() => {
    if (tableStates.stateChange) {
      fetchDataTables();
      setTableStates({
        ...tableStates,
        stateChange: false,
      });
    }
  }, [tableStates]);
  //#endregion

  const [rowKeys, setRowKeys] = React.useState([]);
  const handleSelectedRows = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowKeys(selectedRowKeys);
      // console.log("selectedRowKeys", selectedRowKeys);
      // console.log("selectedRows", selectedRows);
    },
  };

  const handleTableChange = (paging, filters, sorter) => {
    let querySort = {};
    if (sorter && Helpers.checkIsNotNull(sorter.order)) {
      sorter.field.map((name) => {
        querySort[name] = sorter.order === "ascend" ? 1 : -1;
      });
    } else querySort = {};

    setTableStates({
      ...tableStates,
      stateChange: true,
      pagination: paging,
      sortedInfo: querySort,
    });
  };

  const drawerRef = React.useRef();
  const [dataType, setDataType] = React.useState();
  const handleEdit = (data) => {
    setDataType(data);
    drawerRef.current.toggleDrawer(true, {
      title: <Trans>common.update</Trans>,
    });
  };

  const handleCloseDrawer = () => {
    drawerRef.current.toggleDrawer(false, {});
  };

  const handleDelete = (data) => {
    dispatch(
      TYPE_DELETE({
        ids: data !== undefined ? [data._id] : rowKeys,
      })
    );
  };
  
  return (
    <>
      <Space direction="vertical" size={16}>
        <Row className="pane-header">
          <Col xs={24}>
            <ToolbarButtons
              selectedRowKeys={rowKeys}
              type="type"
              deleteEvent={handleDelete}
            />
          </Col>
        </Row>
        <Row className="pane-content">
          <Col xs={24}>
            <RenderTable
              rowSelection={{
                type: "checkbox",
                ...handleSelectedRows,
              }}
              columns={[
                {
                  title: "Name",
                  dataIndex: ["name"],
                  sorter: false,
                  render: (name) => `${name[locale.lang]}`,
                  width: "auto",
                  // fixed: "left",
                },
                {
                  title: "Code",
                  dataIndex: ["_id"],
                  sorter: false,
                  render: (_id) => `${_id}`,
                  width: 300,
                  // fixed: "left",
                },
                {
                  title: "",
                  dataIndex: ["_id", "name"],
                  render: (e, data) => {
                    return (
                      <>
                        <Tag
                          className="callback"
                          onClick={() => handleEdit(data)}
                        >
                          {t("common.edit")}
                        </Tag>
                        <Popconfirm
                          placement="topLeft"
                          title={t("common.areyousurethisrecord")}
                          onConfirm={() => handleDelete(data)}
                          okText={t("common.delete")}
                          cancelText={t("common.cancel")}
                        >
                          <Tag className="callback">{t("common.delete")}</Tag>
                        </Popconfirm>
                      </>
                    );
                  },
                  width: 150,
                  align: "right",
                  className: "actions",
                },
              ]}
              rowKey={(record) => record._id}
              // pagination={tableStates.pagination}
              data={dataStates.d}
              loading={dataStates.isFetching}
              // onChange={handleTableChange}
            />
          </Col>
        </Row>
        <DrawerContent ref={drawerRef}>
          <ActionType data={dataType} handleCloseDrawer={handleCloseDrawer} />
        </DrawerContent>
      </Space>
    </>
  );
};

export default Type;
