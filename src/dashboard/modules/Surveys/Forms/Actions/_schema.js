import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { siteState, localeState} from "@redux/providers/site.reducer";
import { Helpers, hooksInstance } from "@utils/helpers";
import * as yup from "yup";
import moment from "moment";
import gVariables from "@stores/shared/variables";
import { buildTreeSelect } from "@utils/buildTreeView";
//#region redux
import {
  CATEGORY_GET_BY_TYPE,
  categoryState,
} from "@redux/providers/category.reducer";
//#endregion

export default {
  initialValues: (data) => {
    let objData = {};

    if (Helpers.checkIsNotNull(data)) {
      // get categoryids
      objData = {
        ...data,
        categories_ref: data.categories_ref.map((cate) => {
          return cate._id;
        }),
        type_ref: data.type_ref._id,
      };
    } else {
      const site = useSelector(siteState);
      const router = hooksInstance.useRouter();
      const type_ref = router.query.typeid;

      objData = {
        title: {},
        sub_title: {},
        desc: {},
        start_date: moment(new Date()).format(gVariables.defaultDateFormat),
        end_date: "",
        duration: 30,
        categories_ref: [],
        type_ref: type_ref,
        site_ref: site.d._id,
      };
    }

    return objData;
  },
  validateSchema: () => {
    const { t } = useTranslation();
    const locale = useSelector(localeState);

    const _objSchema = {
      categories_ref: yup.array().min(1, t("validate.required")),
      title: yup.object().shape({
        [locale.lang]: yup.string().required(t("validate.required")),
      }),
      start_date: yup.date().required(t("validate.required")),
      end_date: yup
        .date()
        .min(yup.ref("start_date"), t("validate.mustbegreater_startdate"))
        .test({
          name: "same",
          exclusive: false,
          params: {},
          message: t("validate.mustbegreater_startdate"),
          test: function (value) {
            const startDate = moment(this.parent.start_date).format(
              locale.date_format
            );
            const endDate = moment(value).format(locale.date_format);
            return !moment(startDate).isSame(moment(endDate));
          },
        })
        .required(t("validate.required")),
      duration: yup.number().required(t("validate.required")),
    };

    return yup.object().shape(_objSchema);
  },
  dataForm: () => {
    const { t } = useTranslation();
    const router = hooksInstance.useRouter();
    const type_ref = router.query.typeid;
    const locale = useSelector(localeState);
    const category = useSelector(categoryState);
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(CATEGORY_GET_BY_TYPE(type_ref));
    }, []);

    // render title
    const title = {
      tabIndex: 0,
      id: "title",
      field: "title." + locale.lang,
      type: "text",
      label: t("site.title") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "survey-t",
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
      renderName: "survey-t",
      xs: 24,
      sm: 24,
    };

    // render desc
    const desc = {
      tabIndex: 1,
      id: "desc",
      field: "desc." + locale.lang,
      type: "textarea",
      label: t("site.description") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "survey",
      xs: 12,
      sm: 12,
    };

    // render start_date
    const start_date = {
      tabIndex: 3,
      id: "start_date",
      field: "start_date",
      type: "date",
      label: t("survey.startdate"),
      renderName: "survey",
      xs: 12,
      sm: 12,
    };

    // render end_date
    const end_date = {
      tabIndex: 4,
      id: "end_date",
      field: "end_date",
      type: "date",
      label: t("survey.enddate"),
      renderName: "survey",
      xs: 12,
      sm: 12,
    };

    // render categories_ref
    const categories_ref = {
      tabIndex: 5,
      id: "categories_ref",
      field: "categories_ref",
      type: "treeselect",
      label: t("site.categories"),
      renderName: "survey",
      datasource: buildTreeSelect(category.d, locale.lang),
      xs: 12,
      sm: 12,
    };

    // render duration
    const duration = {
      tabIndex: 6,
      id: "duration",
      field: "duration",
      type: "number",
      label: t("survey.timeduration"),
      renderName: "survey",
      xs: 12,
      sm: 12,
    };

    // push all to array
    let inputForms = [];
    inputForms.push(title);
    inputForms.push(sub_title);
    inputForms.push(desc);
    inputForms.push(start_date);
    inputForms.push(end_date);
    inputForms.push(categories_ref);
    inputForms.push(duration);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
