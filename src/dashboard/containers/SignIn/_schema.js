import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as yup from "yup";

export default {
  initialValues: () => {
    return {
      username: "test",
      password: "test",
    };
  },
  dataForm: () => {
    const { t } = useTranslation();

    // render username
    const username = {
      tabIndex: 0,
      id: "username",
      field: "username",
      type: "text",
      label: t("signin.username"),
      renderName: "signin",
      autoFocus: true,
      helperText: t("signin.enterusername"),
      usePrefix: <UserOutlined className="site-form-item-icon" />,
      xs: 24,
      sm: 24,
    };
    username.validations = yup.string().required(t("signin.enterusername"));

    // render password
    const password = {
      tabIndex: 1,
      id: "password",
      field: "password",
      type: "password",
      label: t("signin.password"),
      renderName: "signin",
      helperText: t("signin.enterpassword"),
      usePrefix: <LockOutlined className="site-form-item-icon" />,
      xs: 24,
      sm: 24,
    };
    password.validations = yup.string().required(t("signin.enterpassword"));

    // push all to array
    let inputForms = [];
    inputForms.push(username);
    inputForms.push(password);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
