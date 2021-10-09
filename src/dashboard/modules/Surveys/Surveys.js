import "./Surveys.less";
import { useTranslation, Trans } from "react-i18next";
//#region components/helpers
import gVariables from "@stores/shared/variables";
import ToolbarButtons from "@dashboard/components/ToolbarButtons";
import RenderTable from "@components/common/RenderTable";
import DrawerContent from "@components/common/Drawer";
import ActionType from "@dashboard/modules/Surveys/Forms/Actions";
import { Helpers, objectExtension } from "@utils/helpers";
//#endregion
//#region ant design
import { Row, Col, message, Space, Tag, Popconfirm } from "antd";
//#endregion
//#region Redux
import { useDispatch, useSelector } from "react-redux";
import { typeState } from "@redux/providers/type.reducer";
import {
  SURVEY_GET_BY_PAGENO,
  SURVEY_DELETE,
  surveyState,
} from "@redux/providers/survey.reducer";
import { localeState } from "@redux/providers/site.reducer";
//#endregion

const Surveys = () => {
  //#region init data
  const { t } = useTranslation();
  const locale = useSelector(localeState);
  const type = useSelector(typeState); // type get from app/index.js
  const dispatch = useDispatch();
  const dataStates = useSelector(surveyState);
  const [tableStates, setTableStates] = React.useState({
    stateChange: false,
    pagination: {
      current: 1,
      pageSize: gVariables.pageSize,
      total: 0,
    },
    filteredInfo: {},
    sortedInfo: {},
  });
  //#endregion

  const fetchDataTables = () => {
    const { pagination, filteredInfo, sortedInfo } = tableStates;

    dispatch(
      SURVEY_GET_BY_PAGENO({
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
      title: <Trans>survey.updatesurvey</Trans>,
      cssClass: "surveys",
    });
  };

  const handleCloseDrawer = () => {
    drawerRef.current.toggleDrawer(false, {});
  };

  const handleDelete = (data) => {
    dispatch(
      SURVEY_DELETE({
        ids: data !== undefined ? [data._id] : rowKeys,
      })
    );
  };

  const [selectTypes, setSelectTypes] = React.useState([]);
  const handleOnSelectType = (values) => {
    setSelectTypes(values);

    setTableStates({
      ...tableStates,
      stateChange: true,
      filteredInfo: values.length
        ? {
            type_ref: {
              $in: values,
            },
          }
        : {},
    });
  };
  //#endregion
  return (
    <>
      <Space direction="vertical" size={16}>
        <Row className="pane-header">
          <Col xs={24} sm={24}>
            <ToolbarButtons
              selectedRowKeys={rowKeys}
              type="survey"
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
                  title: t("site.title"),
                  dataIndex: ["title"],
                  sorter: (a, b) => a.title.length - b.title.length,
                  render: (field, data) => {
                    const { sub_title } = data;
                    return (
                      <Space direction="vertical" size={0}>
                        <span className="title">{field[locale.lang]}</span>
                        {sub_title ? (
                          <Tag className="subTitle" color="green">
                            {sub_title[locale.lang]}
                          </Tag>
                        ) : (
                          ""
                        )}
                      </Space>
                    );
                  },
                  width: "auto",
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
              pagination={
                gVariables.pageSize >= dataStates.total
                  ? false
                  : tableStates.pagination
              }
              data={dataStates.d}
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

export default Surveys;
