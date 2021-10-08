import "./PaneContent.less";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import ProgressWorking from "@components/common/ProgressWorking";
import { STEPS_STATUS } from "@stores";
import { progressSteps } from "@app/routes/survey";
import StepsNav from "@components/common/StepsNav/StepsNav";
import Selection from "@surveys/modules/Selection";
import Answers from "@surveys/modules/Answers";
import Results from "@surveys/modules/Results";
import { useSelector } from "react-redux";
import { userAnswerState } from "@redux/ui/survey/user_answer.reducer";

const PaneContent = () => {
  const { t } = useTranslation();
  const user = useSelector(userAnswerState);

  let steps = progressSteps([
    {
      _id: 1,
      title: t("signin.signin"),
      subTitle: "",
      status: STEPS_STATUS.PROCESS,
      description: "",
    },
    {
      _id: 2,
      title: t("survey.chooseyourtest"),
      subTitle: "",
      status: STEPS_STATUS.WAIT,
      description: "",
    },
    {
      _id: 3,
      title: t("survey.completeyourtest"),
      subTitle: "",
      status: STEPS_STATUS.WAIT,
      description: "",
    },
    {
      _id: 4,
      title: t("common.complete"),
      subTitle: "",
      status: STEPS_STATUS.WAIT,
      description: "",
    },
  ]);

  const pathname = window.location.pathname;

  //* match with component from pathname
  const components = {
    "/survey/selections": <Selection />,
    "/survey/answers": <Answers />,
    "/survey/results": <Results />,
  };

  return (
    <>
      <Layout.Content>
        <Layout className="steps-container">
          <StepsNav metadata={steps} />
          {user.authenticated ? <ProgressWorking /> : <></>}
        </Layout>
        <Layout className="pane-container">{components[pathname]}</Layout>
      </Layout.Content>
    </>
  );
};

export default PaneContent;
