import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { siteState } from "@redux/providers/site.reducer";
import { Helpers } from "@utils/helpers";
import gVariables from "@stores/shared/variables";
import * as yup from "yup";

export default {
  initialValues: (data) => {
    let objData = {};

    if (Helpers.checkIsNotNull(data)) {
      objData = data;
    } else {
      const site = useSelector(siteState);

      objData = {
        site_ref: site.d._id,
        name: {},
        axact: false,
        public: false,
        path: "",
        component_import: "",
      };
    }

    return objData;
  },
  dataForm: () => {
    const { t } = useTranslation();
    const locale = gVariables.locale.default;

    // render username
    const name = {
      tabIndex: 0,
      id: "name",
      field: "name." + locale.lang,
      type: "text",
      label: t("site.title") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "type",
      autoFocus: true,
      required: true,
      xs: 24,
      sm: 24,
    };
    name.validations = yup.string().required(t("validate.required"));

    // push all to array
    let inputForms = [];
    inputForms.push(name);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
