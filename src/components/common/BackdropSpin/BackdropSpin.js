import "./BackdropSpin.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { backdropSpinState } from "./backdropSpin.reducer";

const BackdropCircle = () => {
  const backdropSpin = useSelector(backdropSpinState);
  const { type, size, fontSize, tip } = backdropSpin;
  
  const _type = type === undefined ? "spin" : type;
  const _size = size === undefined ? "large" : size;
  const _fontSize = fontSize === undefined ? 32 : fontSize;
  const _tip = tip === undefined ? "" : tip;

  const loadingIcon = (
    <LoadingOutlined style={{ fontSize: _fontSize }} spin />
  );
  
  return (
    <React.Fragment>
      <div className={backdropSpin.open ? "overlay" : "overlay none"}></div>
      <Spin
        tip={_tip}
        size={_size}
        indicator={_type === "loading" ? loadingIcon : ""}
        className={backdropSpin.open ? "" : "none"}
      ></Spin>
    </React.Fragment>
  );
};

export default BackdropCircle;
