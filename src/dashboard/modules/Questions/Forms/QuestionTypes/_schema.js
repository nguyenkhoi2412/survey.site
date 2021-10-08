import { useTranslation } from "react-i18next";
import { Helpers, hooksInstance } from "@utils/helpers";
import { QUESTION_TYPES } from "@stores";
import { buildTreeSelect } from "@utils/buildTreeView";
//#region redux
import { categoryState } from "@redux/providers/category.reducer";
import { useDispatch, useSelector } from "react-redux";
import { siteState } from "@redux/providers/site.reducer";
import gVariables from "@stores/shared/variables";
import * as yup from "yup";
//#endregion

export default {
  initialValues: (qType, data) => {
    const router = hooksInstance.useRouter();
    const type_ref = router.query.typeid;
    delete qType.icon;
    delete qType.desc;

    let objData = {};
    if (Helpers.checkIsNotNull(data)) {
      objData = {
        ...data,
        categories_ref: data.categories_ref._id,
      };
    } else {
      const site = useSelector(siteState);

      objData = {
        title: {},
        desc: {},
        sort_no: 0,
        question_type: qType,
        numberOfAnswers: 1,
        marks: 1,
        answers: [],
        categories_ref: "",
        type_ref: type_ref,
        site_ref: site.d._id,
      };
    }

    return objData;
  },
  validateSchema: (qType) => {
    const { t } = useTranslation();
    const locale = gVariables.locale.default;
    const questionType = qType.text;

    const _objSchema = {
      categories_ref: yup.string().required(t("validate.required")),
      title: yup.object().shape({
        [locale.lang]: yup.string().required(t("validate.required")),
      }),
    };

    switch (questionType) {
      case QUESTION_TYPES.SINGLECHOICE:
      case QUESTION_TYPES.MULTIPLECHOICE:
        _objSchema.numberOfAnswers = yup
          .number()
          .min(1)
          .required(t("validate.required"));
        // _objSchema.options = yup
        //   .array()
        //   .of(
        //     yup.object().shape({
        //       text: yup.object().shape({
        //         [locale.lang]: yup.string().required(t("validate.required")),
        //       }),
        //     })
        //   )
        //   .min(1, "min 1");
        break;
    }

    return yup.object().shape(_objSchema);
  },
  dataForm: (qType) => {
    const { t } = useTranslation();
    const category = useSelector(categoryState);
    const locale = gVariables.locale;
    const questionType = qType.text;

    // render categories_ref
    const categoryRef = {
      tabIndex: 0,
      id: "categories_ref",
      field: "categories_ref",
      type: "treeselect",
      label: t("site.categories"),
      renderName: "questions",
      datasource: buildTreeSelect(category.d),
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
      renderName: "questions",
      autoFocus: true,
      required: true,
      xs: 24,
      sm: 24,
    };

    // render sub_title
    const sub_title = {
      tabIndex: 2,
      id: "sub_title",
      field: "sub_title." + locale.lang,
      type: "text",
      label: t("site.sub_title") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "questions",
      xs: 24,
      sm: 24,
    };

    // render desc
    const desc = {
      tabIndex: 3,
      id: "desc",
      field: "desc." + locale.lang,
      type: "editor",
      label: t("site.description") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "questions",
      xs: 24,
      sm: 24,
    };

    // render marks
    const marks = {
      tabIndex: 4,
      id: "marks",
      field: "marks",
      type: "number",
      label: t("question.marks"),
      renderName: "questions",
      xs: 12,
      sm: 12,
    };

    // render sort_no
    const sort_no = {
      tabIndex: 5,
      id: "sort_no",
      field: "sort_no",
      type: "number",
      label: t("site.sort-no"),
      renderName: "questions",
      xs: 12,
      sm: 12,
    };

    // push all to array
    let inputForms = [];
    inputForms.push(categoryRef);
    inputForms.push(title);
    inputForms.push(sub_title);
    inputForms.push(desc);
    inputForms.push(marks);
    inputForms.push(sort_no);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
