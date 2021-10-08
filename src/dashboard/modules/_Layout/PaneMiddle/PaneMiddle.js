import "./PaneMiddle.less";
import { Layout } from "antd";
import Breadcrumbs from "@components/common/Breadcrumbs";
import Type from "@dashboard/modules/Type";
import Categories from "@dashboard/modules/Categories";
// import Articles from "@modules/Articles";
import TransportExpress from "@dashboard/modules/TransportExpress";
import Surveys from "@dashboard/modules/Surveys";
import Questions from "@dashboard/modules/Questions";

const PaneMiddle = () => {
  const components = {
    "/dashboard/types": <Type />,
    "/dashboard/survey/categories": <Categories />,
    // "/dashboard/type/articles": <Articles />,
    "/dashboard/transport": <TransportExpress />,
    "/dashboard/survey": <Surveys />,
    "/dashboard/survey/questions": <Questions />,
  };
  
  return (
    <>
      <Layout.Content className="split middle">
        <Layout>
          <Breadcrumbs />
        </Layout>
        <Layout className="pane-container">
          {components[window.location.pathname]}
        </Layout>
      </Layout.Content>
    </>
  );
};

export default PaneMiddle;
