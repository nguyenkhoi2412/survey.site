import "./MainContainer.less";
import React from "react";
import { useTranslation } from "react-i18next";
//#region libraries/components
//#endregion

import PaneLeft from "@dashboard/modules/_Layout/PaneLeft";
import PaneMiddle from "@dashboard/modules/_Layout/PaneMiddle";

const MainContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <PaneLeft />
      <PaneMiddle />
    </>
  );
};

export default MainContainer;
