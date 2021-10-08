//import { useTranslation } from "react-i18next";
import {
  ChromeFilled,
  AppstoreOutlined,
  PartitionOutlined,
  WindowsFilled,
  AuditOutlined,
  FileDoneOutlined,
  ReconciliationOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  LineOutlined,
  MenuOutlined,
  TransactionOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Helpers } from "@utils/helpers";
import { Trans } from "react-i18next";
import { QUESTION_TYPES } from "@stores";
import { useSelector } from "react-redux";
import { typeState } from "@redux/providers/type.reducer";

const types = {
  transport: "1b84d620-97ae-48ac-8882-54f24169bd24",
  survey: "777adfe5-060d-9200-7a14-fed5c1ae1af3",
};

export default {
  secondaryMenu: () => {
    let menuPath = [
      {
        key: "sites",
        text: "Sites",
        icon: <ChromeFilled />,
        path: "/dashboard/sites",
      },
      {
        key: "types",
        text: "Types",
        icon: <PartitionOutlined />,
        path: "/dashboard/types",
      },
      // {
      //   key: "transportment",
      //   text: "Transport Express",
      //   icon: <TransactionOutlined />,
      //   children: [
      //     {
      //       key: "transport",
      //       text: "Transports",
      //       icon: <CarOutlined />,
      //       path: "/dashboard/transport?typeid=" + types.transport,
      //     },
      //   ],
      // },
      {
        key: "surveyment",
        text: "Survey management",
        icon: <ReconciliationOutlined />,
        children: [
          {
            key: "survey",
            text: "Surveys",
            icon: <AuditOutlined />,
            path: "/dashboard/survey?typeid=" + types.survey,
          },
          {
            key: "categories",
            text: "Categories",
            icon: <AppstoreOutlined />,
            path: "/dashboard/survey/categories?typeid=" + types.survey,
          },
          {
            key: "questions",
            text: "Questions",
            icon: <FileDoneOutlined />,
            path: "/dashboard/survey/questions?typeid=" + types.survey,
          },
        ],
      },
    ];

    return menuPath;
  },
  renderToolbars: (type) => {
    switch (type) {
      case "type":
        return [
          {
            id: "delete",
            name: "delete",
            loading: false,
            variant: "primary",
            shape: "square",
            disabled: true,
            text: <Trans>common.delete</Trans>,
            icon: <MinusCircleOutlined />,
            action: "delete",
            callback: {
              renderType: "modal",
              description: <Trans>common.areyousurethisrecord</Trans>,
              type: "info",
            },
          },
          {
            id: "insert",
            name: "insert",
            loading: false,
            variant: "primary",
            shape: "square",
            text: <Trans>common.addnew</Trans>,
            icon: <PlusCircleOutlined />,
            action: "opendrawer",
            callback: {
              renderType: "drawer",
              component: "actionType",
              name: "actiontype",
              title: <Trans>type.createnewtype</Trans>,
            },
          },
        ];
      case "category":
        return [
          {
            id: "delete",
            name: "delete",
            loading: false,
            variant: "primary",
            shape: "square",
            disabled: true,
            text: <Trans>common.delete</Trans>,
            icon: <MinusCircleOutlined />,
            action: "delete",
            callback: {
              renderType: "modal",
              description: <Trans>common.areyousurethisrecord</Trans>,
              type: "info",
            },
          },
          {
            id: "insert",
            name: "insert",
            loading: false,
            variant: "primary",
            shape: "square",
            text: <Trans>common.addnew</Trans>,
            icon: <PlusCircleOutlined />,
            action: "opendrawer",
            callback: {
              renderType: "drawer",
              component: "actionCategory",
              name: "actioncategory",
              title: <Trans>category.createnewcategory</Trans>,
              cssClass: "categories",
            },
          },
        ];
      case "question":
        return [
          {
            id: "delete",
            name: "delete",
            loading: false,
            variant: "primary",
            shape: "square",
            disabled: true,
            text: <Trans>common.delete</Trans>,
            icon: <MinusCircleOutlined />,
            action: "delete",
            callback: {
              renderType: "modal",
              description: <Trans>common.areyousurethisrecord</Trans>,
              type: "info",
            },
          },
          {
            id: "insert",
            name: "insert",
            loading: false,
            variant: "primary",
            shape: "square",
            text: <Trans>common.addnew</Trans>,
            icon: <PlusCircleOutlined />,
            action: "opendrawer",
            callback: {
              renderType: "drawer",
              component: "actionQuestion",
              name: "actionquestion",
              title: <Trans>question.createnewquestion</Trans>,
              placement: "top",
              height: "100%",
              cssClass: "questions",
            },
          },
        ];
      case "survey":
        return [
          {
            id: "delete",
            name: "delete",
            loading: false,
            variant: "primary",
            shape: "square",
            disabled: true,
            text: <Trans>common.delete</Trans>,
            icon: <MinusCircleOutlined />,
            action: "delete",
            callback: {
              renderType: "modal",
              description: <Trans>common.areyousurethisrecord</Trans>,
              type: "info",
            },
          },
          {
            id: "insert",
            name: "insert",
            loading: false,
            variant: "primary",
            shape: "square",
            text: <Trans>common.addnew</Trans>,
            icon: <PlusCircleOutlined />,
            action: "opendrawer",
            callback: {
              renderType: "drawer",
              component: "actionSurveys",
              title: <Trans>survey.createnewsurvey</Trans>,
              cssClass: "surveys",
            },
          },
        ];
    }
  },
  questionTypes: () => {
    return [
      // {
      //   _id: 1,
      //   text: QUESTION_TYPES.SINGLELINE,
      //   desc: "Single-line free text questions allow respondents to enter their answer into a text box that is restricted to one line of text. You can set the width of the text box as well as the number of characters that can be entered. You can also restrict the format in which an answer can be submitted, for example a number, valid email address or post code.",
      //   icon: <LineOutlined />,
      // },
      // {
      //   _id: 2,
      //   text: QUESTION_TYPES.MULTIPLELINE,
      //   desc: "Multi-line free text questions permit longer answers. You can set the height and width of the text box as well as the number of characters that can be entered. You can also restrict the format in which an answer can be submitted.",
      //   icon: <MenuOutlined />,
      // },
      {
        _id: 3,
        text: QUESTION_TYPES.SINGLECHOICE,
        desc: "Single choice questions allow respondents to pick just one answer from a list using circular radio buttons. When a respondent selects an answer, all other choices are automatically deselected. The list of answers can be presented vertically or horizontally. You can also include an ‘Other’ option to allow respondents to enter their own answer, if none of the given choices apply to them.",
        icon: <CheckCircleOutlined />,
      },
      // {
      //   _id: 4,
      //   text: QUESTION_TYPES.MULTIPLECHOICE,
      //   desc: "Multiple choice questions allow respondents to select one or several answers from a list using tick boxes. You can restrict the number of answer options that can be selected or ask the respondent to ‘select all that apply’. You can also include an ‘Other’ option to allow respondents to enter their own answer, if none of the given choices apply to them.",
      //   icon: <CheckSquareOutlined />,
      // },
      // {
      //   _id: 5,
      //   text: QUESTION_TYPES.DROPDOWN,
      //   desc: "Selection list questions are used to ask respondents to pick one answer from a drop-down list. They are a useful alternative to Multiple choice (single answer) questions where the list of choices is very long. You can also include an ‘Other’ option to allow respondents to enter their own answer, if none of the given choices apply to them.",
      //   icon: <ProfileOutlined />,
      // },
      // {
      //   _id: 6,
      //   text: QUESTION_TYPES.RANK,
      //   desc: "Scale/rank questions can be used to ask respondents whether they agree or disagree with a number of statements, to rate items on a scale, or to rank items in order of importance or preference, for example. Use this question type if you want to create Likert-type scales or semantic differential scales",
      //   icon: <OrderedListOutlined />,
      // },
      // {
      //   _id: 7,
      //   text: QUESTION_TYPES.DATETIME,
      //   desc: "Date and time questions require respondents to enter both a date and a time within the same question in the format DD/MM/YYYY HH:MM. You can set a date and time range in which answers have to fall.",
      //   icon: <FieldTimeOutlined />,
      // },
    ];
  },
};
