import "./Home.less";
import { Redirect } from "react-router-dom";
import logo from "@assets/images/logo.svg";
import { Space, Button, Anchor } from "antd";
const { Link } = Anchor;
import { hooksInstance } from "@utils/helpers";

const Home = () => {
  const router = hooksInstance.useRouter();

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Space>
              <Anchor>
                <Link href="/dashboard/login" title="Go to Dashboard" />
                <Link href="/survey/login" title="Go to Survey" />
              </Anchor>
              {/* <Button
                type="secondary"
                htmlType="reset"
                className="form-button"
                onClick={() => {
                  return <Redirect exact from="/home" to="/dashboard/login" />;
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                type="secondary"
                htmlType="reset"
                className="form-button"
                onClick={() => router.push("/survey/login")}
              >
                Go to Survey
              </Button> */}
            </Space>
          </div>
        </header>
      </div>
    </>
  );
};

export default Home;
