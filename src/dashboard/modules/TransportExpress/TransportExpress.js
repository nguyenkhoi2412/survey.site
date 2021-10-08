import "./TransportExpress.less";
import DeviceEmulator from "react-device-emulator";
import "react-device-emulator/lib/styles/style.css";

const TransportExpress = () => {
  return (
    <>
      <DeviceEmulator type="tab" withDeviceSwitch withRotator>
        <h1>Welcome to React Device Emulator</h1>
      </DeviceEmulator>
      <DeviceEmulator
        type="mobile"
        withDeviceSwitch
        withRotator
        url="survey?typeid=777adfe5-060d-9200-7a14-fed5c1ae1af3"
      ></DeviceEmulator>
      <DeviceEmulator
        type="tab"
        withoutChrome
        url="survey?typeid=777adfe5-060d-9200-7a14-fed5c1ae1af3"
      ></DeviceEmulator>
    </>
  );
};

export default TransportExpress;
