import "./app.less";
import React from "react";
import { Redirect } from "react-router-dom";
import cmsFavicon from "@assets/favicons/dashboard/favicon.ico";
import surveyFavicon from "@assets/favicons/survey/favicon.ico";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PagesRoute from "@utils/components/PagesRoute";
import gVariable from "@stores/shared/variables";
import routes, { CURRENT_MODULES, MODULES } from "@app/routes";
//#region useHooks,components, helper
import BackdropSpin from "@components/common/BackdropSpin";
import ProgressBar from "@components/common/ProgressBar";
// import SnackbarmaUI from "@components/common/Snackbar";
// import Linear from "@components/common/Linear";
//#endregion
import { useDispatch, useSelector } from "react-redux";
import {
  SITE_GET_BY_NAME,
  siteState,
  localeState,
} from "@redux/providers/site.reducer";
import { TYPE_GET_BY_SITE } from "@redux/providers/type.reducer";
import { Helpers } from "@utils/helpers";

const App = () => {
  console.warn = () => {};
  dynamicFavicons();

  const dispatch = useDispatch();
  const site = useSelector(siteState);

  //* GET SITE INFO
  React.useEffect(() => {
    dispatch(SITE_GET_BY_NAME());
  }, []);

  //* GET TYPE BY SITE
  React.useEffect(() => {
    if (site.d._id > 0) {
      dispatch(TYPE_GET_BY_SITE(site.d._id));
    }
  }, [site.d]);

  return (
    <>
      <ProgressBar />
      <BackdropSpin />
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {routes.map((route, index) => (
            <PagesRoute key={index} {...route}>
              {route.children}
            </PagesRoute>
          ))}
        </Switch>
      </Router>
      {/** Snackbar show message results */}
      {/* <SnackbarmaUI /> */}
    </>
  );
};

export default App;

const dynamicFavicons = () => {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  switch (CURRENT_MODULES()) {
    case MODULES.SURVEY:
      link.href = surveyFavicon;
      break;

    default:
      link.href = cmsFavicon;
      break;
  }

  if (CURRENT_MODULES() !== "") {
    document.body.classList.add(CURRENT_MODULES());
  }
};
