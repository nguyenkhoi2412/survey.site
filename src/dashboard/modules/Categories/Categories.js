import "./Categories.less";
import { useTranslation, Trans } from "react-i18next";
//#region components/helpers
import gVariables from "@stores/shared/variables";
import ToolbarButtons from "@dashboard/components/ToolbarButtons";
import RenderTable from "@components/common/RenderTable";
import DrawerContent from "@components/common/Drawer";
import ActionType from "@dashboard/modules/Categories/Forms/Actions";
import { Helpers, objectExtension, hooksInstance } from "@utils/helpers";
//#endregion
//#region ant design
import { Row, Col, message, Space, Tag, Popconfirm, Select } from "antd";
//#endregion
//#region Redux
import { useDispatch, useSelector } from "react-redux";
import { typeState } from "@redux/providers/type.reducer";
import {
  CATEGORY_GET_BY_PAGENO,
  CATEGORY_DELETE,
  categoryState,
} from "@redux/providers/category.reducer";
import { localeState } from "@redux/providers/site.reducer";
//#endregion

const Categories = () => {
  const router = hooksInstance.useRouter();
  const typeid = router.query.typeid;

  //#region init data
  const { t } = useTranslation();
  const locale = useSelector(localeState);
  const type = useSelector(typeState); // type get from app/index.js
  const dispatch = useDispatch();
  const dataStates = useSelector(categoryState);
  const [tableStates, setTableStates] = React.useState({
    stateChange: false,
    pagination: {
      current: 1,
      pageSize: gVariables.pageSize,
      total: 0,
    },
    filteredInfo: {
      type_ref: {
        $in: typeid,
      },
    },
    sortedInfo: {},
  });
  const [dataSource, setDataSource] = React.useState({
    columns: [
      {
        key: "title",
        title: t("site.title"),
        dataIndex: ["title"],
        width: "300",
        // fixed: "left",
      },
      {
        key: "action",
        title: "",
        dataIndex: ["action"],
        width: 150,
        align: "right",
        className: "actions",
      },
    ],
    data: [],
  });
  //#endregion

  //#region functions call
  const fetchDataTables = () => {
    const { pagination, filteredInfo, sortedInfo } = tableStates;

    dispatch(
      CATEGORY_GET_BY_PAGENO({
        pageno: pagination.current,
        pagesize: pagination.pageSize,
        query: {
          sortCriteria: sortedInfo,
          filterCriteria: filteredInfo,
        },
      })
    );
  };

  const buildTreeView = (directories, parent = "") => {
    let node = [];
    directories
      .filter(function (d) {
        return d["parent"] === parent;
      })
      .forEach(function (d) {
        var cd = {
          key: d._id,
          title: <CellTitle data={d} />,
          action: (
            <CellActions
              data={d}
              handleDelete={() => handleDelete(d)}
              handleEdit={() => handleEdit(d)}
            />
          ),
        };

        const getChild = buildTreeView(directories, d["_id"]);
        if (getChild.length > 0) {
          cd["children"] = getChild;
        }

        return node.push(cd);
      });

    return node;
  };
  //#endregion

  //#region useEffect
  React.useEffect(() => {
    fetchDataTables();
  }, []); // condition use first render

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

    // build hierarchy data
    if (Helpers.checkIsNotNull(dataStates.hierarchy)) {
      setDataSource({ ...dataSource, data: buildTreeView(dataStates.d) });
    }
  }, [dataStates, type]);

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

  //#region handle events
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
      pagination: objectExtension.isEmptyObject(paging)
        ? { ...tableStates.pagination }
        : paging,
      sortedInfo: querySort,
    });
  };

  const drawerRef = React.useRef();
  const [dataType, setDataType] = React.useState();
  const handleEdit = (data) => {
    setDataType(data);
    drawerRef.current.toggleDrawer(true, {
      title: <Trans>common.update</Trans>,
      cssClass: "categories",
    });
  };

  const handleCloseDrawer = () => {
    drawerRef.current.toggleDrawer(false, {});
  };

  const handleDelete = (data) => {
    dispatch(
      CATEGORY_DELETE({
        ids: data !== undefined ? [data._id] : rowKeys,
      })
    );
  };

  // const [selectTypes, setSelectTypes] = React.useState([]);
  // const handleOnSelectType = (values) => {
  //   setSelectTypes(values);

  //   setTableStates({
  //     ...tableStates,
  //     stateChange: true,
  //     filteredInfo: values.length
  //       ? {
  //           type_ref: {
  //             $in: values,
  //           },
  //         }
  //       : {},
  //   });
  // };
  //#endregion
  return (
    <>
      <Space direction="vertical" size={16}>
        <Row className="pane-header">
          <Col xs={24} sm={24}>
            <ToolbarButtons
              selectedRowKeys={rowKeys}
              type="category"
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
              columns={dataSource.columns}
              // rowKey={(record) => record._id}
              pagination={
                gVariables.pageSize >= dataStates.total
                  ? false
                  : tableStates.pagination
              }
              data={dataSource.data}
              loading={dataStates.isFetching}
              onChange={handleTableChange}
              bordered
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

export default Categories;

//#region help build table
const CellTitle = (props) => {
  const { data } = props;
  const locale = useSelector(localeState);

  return (
    <Space direction="vertical" size={0}>
      <span className="title">{data.title[locale.lang]}</span>
      {data.sub_title ? (
        <Tag className="subTitle" color="green">
          {data.sub_title[locale.lang]}
        </Tag>
      ) : (
        ""
      )}
    </Space>
  );
};

const CellActions = (props) => {
  const { data, handleDelete, handleEdit } = props;
  const { t } = useTranslation();

  return (
    <>
      <Tag className="callback" onClick={() => handleEdit(data)}>
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
};

//#endregion
