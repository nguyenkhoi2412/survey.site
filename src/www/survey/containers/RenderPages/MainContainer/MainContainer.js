import "./MainContainer.less";
import React from "react";
import { useTranslation } from "react-i18next";
//#region libraries/components
import PaneContent from "@surveys/modules/_Layout/PaneContent";
//#endregion

const MainContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <PaneContent />
    </>
  );
};

export default MainContainer;
