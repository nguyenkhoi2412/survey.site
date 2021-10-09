import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { siteState, localeState } from "@redux/providers/site.reducer";
import { Helpers, hooksInstance } from "@utils/helpers";
import { buildTreeSelect } from "@utils/buildTreeView";
import * as yup from "yup";
//#region redux
import { typeState } from "@redux/providers/type.reducer";
import { categoryState } from "@redux/providers/category.reducer";
//#endregion

export default {
  initialValues: (data) => {
    let objData = {};

    if (Helpers.checkIsNotNull(data)) {
      objData = {
        ...data,
        type_ref: data.type_ref._id,
      };
    } else {
      const site = useSelector(siteState);
      const router = hooksInstance.useRouter();
      const typeid = router.query.typeid;

      objData = {
        title: {},
        desc: {},
        parent: "",
        children: [],
        type_ref: typeid,
        site_ref: site.d._id,
      };
    }

    return objData;
  },
  dataForm: () => {
    const { t } = useTranslation();
    const locale = useSelector(localeState);
    const type = useSelector(typeState);
    const cate = useSelector(categoryState);

    const parent = {
      tabIndex: 0,
      id: "parent",
      field: "parent",
      type: "treeselect",
      label: t("category.select_parent"),
      renderName: "category-hierarchy",
      datasource: buildTreeSelect(cate.d, locale.lang),
      xs: 24,
      sm: 24,
    };

    // render type_ref
    const typeRef = {
      tabIndex: 2,
      id: "type_ref",
      field: "type_ref",
      type: "select",
      label: t("site.title"),
      renderName: "category-t",
      options: [],
      disabled: true,
      xs: 24,
      sm: 24,
    };

    type.d.map((t) => {
      typeRef.options.push({
        id: t._id,
        value: t._id,
        text: t.name[locale.lang],
        selected: type.d.length === 1 ? true : false,
      });
    });
    typeRef.validations = yup.string().required(t("validate.required"));

    // render sub_title
    const sub_title = {
      tabIndex: 3,
      id: "sub_title",
      field: "sub_title." + locale.lang,
      type: "text",
      label: t("site.sub_title") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "category-t",
      autoFocus: false,
      required: false,
      xs: 24,
      sm: 24,
    };

    // render title
    const title = {
      tabIndex: 1,
      id: "title",
      field: "title." + locale.lang,
      type: "text",
      label: t("site.title") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "category",
      autoFocus: true,
      required: true,
      xs: 24,
      sm: 24,
    };
    title.validations = yup.string().required(t("validate.required"));

    // render desc
    const desc = {
      tabIndex: 4,
      id: "desc",
      field: "desc." + locale.lang,
      type: "editor",
      label: t("site.description") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "category",
      autoFocus: false,
      required: true,
      xs: 24,
      sm: 24,
    };

    // push all to array
    let inputForms = [];
    inputForms.push(parent);
    inputForms.push(typeRef);
    inputForms.push(title);
    inputForms.push(sub_title);
    inputForms.push(desc);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
