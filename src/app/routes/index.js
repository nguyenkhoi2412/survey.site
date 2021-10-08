import Home from "@containers/Home";
import About from "@containers/About";
import surveyRoutes from "./survey";

import DashboardSignIn from "@dashboard/containers/SignIn";
import DashboardLayout from "@dashboard/containers/RenderPages/LayoutTemplate";

const RELATIVE_PATH = process.env.RELATIVE_PATH || "/";

export default [
  //#region Home page
  {
    path: "/home",
    public: true,
    title: "Home",
    children: <Home />,
  },
  {
    path: "/about",
    exact: true,
    public: true,
    title: "About",
    children: <About />,
  },
  //#endregion
  //#region DASHBOARD
  {
    path: RELATIVE_PATH + "dashboard/login",
    exact: true,
    public: true,
    title: "Loggin | Code Management System",
    children: <DashboardSignIn />,
  },
  {
    path: RELATIVE_PATH + "dashboard/sites",
    exact: true,
    public: true,
    title: "Sites | Code Management System",
    children: <DashboardLayout />,
  },
  {
    path: RELATIVE_PATH + "dashboard/types",
    exact: true,
    public: false,
    title: "Types | Code Management System",
    children: <DashboardLayout />,
  },
  {
    path: RELATIVE_PATH + "dashboard/survey",
    public: false,
    title: "Surveys | Code Management System",
    children: <DashboardLayout />,
  },
  {
    path: RELATIVE_PATH + "dashboard/survey/categories",
    public: false,
    title: "Surveys | Categories | Code Management System",
    children: <DashboardLayout />,
  },
  {
    path: RELATIVE_PATH + "dashboard/survey/questions",
    public: false,
    title: "Surveys | Questions | Code Management System",
    children: <DashboardLayout />,
  },
  //#endregion
  ...surveyRoutes,
];

//#region process path
export const MODULES = {
  DASHBOARD: "dashboard",
  SURVEY: "survey",
};

export const CURRENT_MODULES = () => {
  const pathname = window.location.pathname;
  const routeName = pathname.split("/");

  return routeName[routeName[0] === "" ? 1 : 0].toLowerCase();
};
//#endregion
