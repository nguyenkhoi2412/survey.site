import { useTranslation } from "react-i18next";
import gVariables from "@stores/shared/variables";
import * as yup from "yup";
import moment from "moment";

export default {
  initialValues: () => {
    return {
      firstname: "",
      lastname: "",
      email: "",
      birthday: "",
      test: [],
    };
  },
  validateSchema: () => {
    const { t } = useTranslation();
    const locale = gVariables.locale;

    const _objSchema = {
      firstname: yup.string().required(t("validate.required")),
      lastname: yup.string().required(t("validate.required")),
      email: yup.string().email().required(t("validate.email")),
      birthday: yup
        .mixed()
        .nullable(true)
        .required(t("validate.required"))
        .transform((value) =>
          value ? moment(value).format(locale.date_format) : null
        ),
    };

    return yup.object().shape(_objSchema);
  },
  dataForm: () => {
    const { t } = useTranslation();
    const locale = gVariables.locale;

    // render firstname
    const firstname = {
      tabIndex: 0,
      id: "firstname",
      field: "firstname",
      type: "text",
      label: t("user.firstname"),
      renderName: "signin-name",
      autoFocus: true,
      xs: 12,
      sm: 12,
    };

    // render lastname
    const lastname = {
      tabIndex: 1,
      id: "lastname",
      field: "lastname",
      type: "text",
      label: t("user.lastname"),
      renderName: "signin-name",
      xs: 12,
      sm: 12,
    };

    // render email
    const email = {
      tabIndex: 2,
      id: "email",
      field: "email",
      type: "email",
      label: t("user.email"),
      renderName: "signin",
      xs: 24,
      sm: 24,
    };

    // render birthday
    const birthday = {
      tabIndex: 3,
      id: "birthday",
      field: "birthday",
      type: "date",
      label: t("user.birthday"),
      renderName: "signin",
      dateFormat: locale.date_format,
      xs: 24,
      sm: 24,
    };

    // push all to array
    let inputForms = [];
    inputForms.push(firstname);
    inputForms.push(lastname);
    inputForms.push(email);
    inputForms.push(birthday);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
