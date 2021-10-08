import "./TreeViewSelect.less";
import React from "react";
import { TreeSelect } from "antd";
// const { SHOW_PARENT } = TreeSelect;

const TreeViewSelect = (props) => {
  const { datasource, multiple } = props;

  const [state, setState] = React.useState({
    value: multiple ? [] : "",
  });
  

  React.useEffect(() => {
    setState({ value: props.value });
  }, [datasource]);

  const onChange = (value, label, extra) => {
    setState({ value });
    
    if (props.onChange instanceof Function) {
      props.onChange(value, label);
    }
// console.log('value', value);
// console.log('label', label);
  };

  const treeData = datasource;
  const tProps = {
    ...props,
    treeData, //*
    treeLine: true && {},
    value: state.value, //*
    treeDefaultExpandedKeys: Array.isArray(state.value)
      ? state.value
      : [state.value],
    onChange: onChange, //*
    treeCheckable: props.treeCheckable || false, //*
    multiple: Array.isArray(state.value),
    maxTagCount: 'responsive',
    // showCheckedStrategy: SHOW_PARENT,
    placeholder: props.placeholder || "",
    allowClear: true,
    style: {
      width: "100%",
    },
  };

  return <TreeSelect {...tProps} />;
};

export default TreeViewSelect;
