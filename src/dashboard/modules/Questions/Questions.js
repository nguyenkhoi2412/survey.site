import "./Questions.less";
import { useTranslation, Trans } from "react-i18next";
//#region components/helpers
import gVariables from "@stores/shared/variables";
import ToolbarButtons from "@dashboard/components/ToolbarButtons";
import RenderTable from "@components/common/RenderTable";
import DrawerContent from "@components/common/Drawer";
// import FiltersBar from "@dashboard/components/FiltersBar";
import ActionType from "@dashboard/modules/Questions/Forms/Actions";
import FloatLabel from "@components/common/Forms/FloatLabel";
import TreeViewSelect from "@components/common/Forms/TreeViewSelect/TreeViewSelect";
import { Helpers, hooksInstance, objectExtension } from "@utils/helpers";
import { buildTreeSelect } from "@utils/buildTreeView";
//#endregion
//#region ant design
import {
  Tooltip,
  Row,
  Col,
  message,
  Space,
  Tag,
  Popconfirm,
  Select,
} from "antd";
import {
  LineOutlined,
  MenuOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
//#endregion
//#region Redux
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORY_GET_BY_TYPE,
  categoryState,
} from "@redux/providers/category.reducer";
import {
  QUESTION_GET_BY_PAGENO,
  QUESTION_DELETE,
  questionState,
} from "@redux/providers/question.reducer";
//#endregion

const Questions = () => {
  const router = hooksInstance.useRouter();
  const typeid = router.query.typeid;

  //#region init data
  const { t } = useTranslation();
  const locale = gVariables.locale.default;
  const category = useSelector(categoryState);
  const dispatch = useDispatch();
  const dataStates = useSelector(questionState);
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
      QUESTION_GET_BY_PAGENO({
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
    dispatch(CATEGORY_GET_BY_TYPE(typeid));

    Helpers.simulateNetworkRequest(400).then(() => {
      fetchDataTables();
    });
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
      title: <Trans>question.updatequestion</Trans>,
      name: "actionquestion",
      placement: "top",
      height: "100%",
      cssClass: "questions",
    });
  };

  const handleCloseDrawer = () => {
    drawerRef.current.toggleDrawer(false, {});
  };

  const handleDelete = (data) => {
    dispatch(
      QUESTION_DELETE({
        ids: data !== undefined ? [data._id] : rowKeys,
      })
    );
  };

  const [selectCategories, setSelectCategories] = React.useState([]);
  const handleOnSelectCategory = (values) => {
    setSelectCategories(values);

    setTableStates({
      ...tableStates,
      stateChange: true,
      filteredInfo: values.length
        ? {
            categories_ref: {
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
          <Col xs={24} sm={18}>
            <ToolbarButtons
              selectedRowKeys={rowKeys}
              type="question"
              deleteEvent={handleDelete}
            />
          </Col>
          <Col xs={24} sm={6}>
            <FloatLabel label={t("site.categories")} value={selectCategories}>
              <Col xs={24} className="field-container">
                <TreeViewSelect
                  name="categories_ref"
                  datasource={buildTreeSelect(category.d)}
                  onChange={handleOnSelectCategory}
                  value={selectCategories}
                />
              </Col>
            </FloatLabel>
          </Col>
          {/* <FiltersBar /> */}
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
                  ellipsis: true,
                  sorter: (a, b) => a.title.length - b.title.length,
                  render: (field, data) => {
                    let renderQuestionTypeIcons = <></>;
                    switch (data.question_type._id) {
                      case 2:
                        renderQuestionTypeIcons = <MenuOutlined />;
                        break;

                      case 3:
                        renderQuestionTypeIcons = <CheckCircleOutlined />;
                        break;

                      case 4:
                        renderQuestionTypeIcons = <CheckSquareOutlined />;
                        break;

                      case 5:
                        renderQuestionTypeIcons = <ProfileOutlined />;
                        break;

                      default:
                        // is 1
                        renderQuestionTypeIcons = <LineOutlined />;
                        break;
                    }

                    return (
                      <Space className="icon-name">
                        <Tooltip title={data.question_type.text}>
                          {renderQuestionTypeIcons}
                        </Tooltip>
                        {field[locale.lang]}
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
            />
          </Col>
        </Row>
        <DrawerContent ref={drawerRef}>
          <ActionType data={dataType} onCloseDrawer={handleCloseDrawer} />
        </DrawerContent>
      </Space>
    </>
  );
};

export default Questions;
