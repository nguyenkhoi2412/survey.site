import "./Home.less";
import logo from "@assets/images/logo.svg";
import { Space, Button } from "antd";
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
              <Button
                type="secondary"
                htmlType="reset"
                className="form-button"
                onClick={() => router.push("/dashboard/login")}
              >Go to Dashboard</Button>
              <Button
                type="secondary"
                htmlType="reset"
                className="form-button"
                onClick={() => router.push("/survey/login")}
              >
                Go to Survey
              </Button>
            </Space>
          </div>
        </header>
      </div>
    </>
  );
};

export default Home;
