import { STEPS_STATUS } from "@stores";
import SurveySignIn from "@surveys/containers/SignIn";
import SurveyLayout from "@surveys/containers/RenderPages/LayoutTemplate";

export default [
  {
    path: "/survey/login",
    exact: true,
    public: true,
    title: "Loggin | Surveys",
    children: <SurveySignIn />,
  },
  {
    path: "/survey/selections",
    exact: true,
    public: false,
    title: "Select your surveys | Surveys",
    children: <SurveyLayout />,
  },
  {
    path: "/survey/answers",
    exact: true,
    public: false,
    title: "Complete your survey | Surveys",
    children: <SurveyLayout />,
  },
  {
    path: "/survey/results",
    exact: true,
    public: false,
    title: "Results your survey | Surveys",
    children: <SurveyLayout />,
  },
];

//#region steps propgress surveys
export const progressSteps = (steps = []) => {
  let cloneSteps = [...steps];
  //* set steps depend on pathname
  switch (window.location.pathname) {
    case "/survey/selections":
      cloneSteps[0].status = STEPS_STATUS.FINISH;
      cloneSteps[1].status = STEPS_STATUS.PROCESS;
      break;

    case "/survey/answers":
      cloneSteps[0].status = STEPS_STATUS.FINISH;
      cloneSteps[1].status = STEPS_STATUS.FINISH;
      cloneSteps[2].status = STEPS_STATUS.PROCESS;
      break;

    case "/survey/results":
      cloneSteps[0].status = STEPS_STATUS.FINISH;
      cloneSteps[1].status = STEPS_STATUS.FINISH;
      cloneSteps[2].status = STEPS_STATUS.FINISH;
      cloneSteps[3].status = STEPS_STATUS.PROCESS;
      break;
  }

  return cloneSteps;
};
