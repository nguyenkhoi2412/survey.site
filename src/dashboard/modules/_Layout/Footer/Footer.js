import "./Footer.less";
import { Typography, Col, Alert } from "antd";
import { useSelector } from "react-redux";
import { alertState } from "@redux/utils/shared.reducer";

const { Text, Link } = Typography;

const Copyright = () => {
  const alertReducer = useSelector(alertState);

  return (
    <Col xs={24}>
      <Alert
        message={alertReducer.message}
        type={alertReducer.type}
        showIcon
        closable
        className={alertReducer.show ? "" : "none"}
      />
      <Text>Copyright © </Text>
      <Link href="https://ant.design/" target="_blank">
        Ant Design
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Col>
  );
};

const Footer = () => {
  //#region render html content
  return (
    <footer className="fixed-bottom">
      <Copyright />
    </footer>
  );
};

export default Footer;
