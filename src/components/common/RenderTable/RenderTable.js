import "./RenderTable.less";
import { Table } from "antd";

const DataTable = (props) => {
  const { columns, loading, data, pagination } = props;

  //#region init data
  //#endregion

  //#region handle table pass data to parents
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     props.handleSelectedRows(selectedRowKeys, selectedRows);
  //   },
  // };

  // const handleTableChange = (pagination, filters, sorter) => {
  //   props.handleTableChange(pagination, filters, sorter);
  // };
  //#endregion
  return (
    <>
      <Table
        {...props}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        // onChange={handleTableChange}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        sticky
        // scroll={{ y: 240 }}
      />
    </>
  );
};

export default DataTable;
