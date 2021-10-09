import "./DynamicInputAnswers.less";
import { useTranslation } from "react-i18next";
import RenderFieldForm from "@components/common/Forms/RenderFieldForm";
import { Helpers, objectExtension } from "@utils/helpers";
import { localeState } from "@redux/providers/site.reducer";
import { useSelector } from "react-redux";
//#region redux
//#endregion

const DynamicInputAnswers = ({ questionType, dataAnswers, formik }) => {
  //#region init variables
  const { t } = useTranslation();
  const locale = useSelector(localeState);
  const field = "answers";
  const fieldSelect = "numberOfAnswers";
  const tabIndex = 7;
  const [answers, setAnswers] = React.useState(
    Helpers.checkIsNotNull(dataAnswers)
      ? dataAnswers
      : [
          {
            _id: Helpers.uuidv4(),
            text: { [locale.lang]: "" },
            correct: false,
            desc: {},
          },
        ]
  );
  const [inputList, setInputList] = React.useState([
    {
      tabIndex: tabIndex,
      id: field + "." + 0 + ".text." + locale.lang,
      field: field + "." + 0 + ".text." + locale.lang,
      type: "text",
      label: t("question.answers") + " [" + locale.lang.toUpperCase() + "]",
      renderName: "answers",
      xs: 24,
      sm: 24,
    },
  ]);

  //#endregion
  React.useEffect(() => {
    if (Helpers.checkIsNotNull(dataAnswers)) renderDynamicInput(dataAnswers);
  }, [dataAnswers]);

  React.useEffect(() => {
    // check re-render when reset form
    if (formik.values.answers.length === 0) {
      handleNumberOfAnswers();
    }
  }, [formik.values.answers]);

  //#region select numberOfAnswers
  const renderNumberOfAnswers = {
    tabIndex: 6,
    id: fieldSelect,
    field: fieldSelect,
    type: "select",
    label: t("question.numberOfOptionsAnswer"),
    renderName: "answers",
    onChange: (value) => handleNumberOfAnswers(value),
    options: [
      {
        value: 1,
        text: 1,
      },
      {
        value: 2,
        text: 2,
      },
      {
        value: 3,
        text: 3,
      },
      {
        value: 4,
        text: 4,
      },
      {
        value: 5,
        text: 5,
      },
      {
        value: 6,
        text: 6,
      },
      {
        value: 7,
        text: 7,
      },
      {
        value: 8,
        text: 8,
      },
      {
        value: 9,
        text: 9,
      },
      {
        value: 10,
        text: 10,
      },
    ],
    xs: 24,
    sm: 24,
  };

  const handleNumberOfAnswers = (value = 1) => {
    const previousNumber = answers.length || 0;
    let arrayOfQuestions = [...answers];

    //save data from formik
    arrayOfQuestions = cloneTextData(arrayOfQuestions);

    if (previousNumber < value) {
      for (let i = previousNumber; i < value; i++) {
        arrayOfQuestions.push({
          _id: Helpers.uuidv4(),
          text: { [locale.lang]: "" },
          correct: false,
          desc: {},
        });
      }
    } else {
      for (let i = previousNumber; i >= value; i--) {
        arrayOfQuestions.splice(i, 1);
      }
    }

    renderDynamicInput(arrayOfQuestions);
    setAnswers(arrayOfQuestions);
    formik.setFieldValue(field, arrayOfQuestions);
  };

  const cloneTextData = (arrayOfQuestions) => {
    return arrayOfQuestions.map((ques, index) => {
      const text = objectExtension.getValueObjects(
        formik,
        "values.answers." + index + ".text." + locale.lang
      );

      const desc = objectExtension.getValueObjects(
        formik,
        "values.answers." + index + ".desc." + locale.lang
      );

      return {
        ...ques,
        text: {
          [locale.lang]: text,
        },
        desc: {
          [locale.lang]: desc,
        },
      };
    });
  };
  //#endregion

  //#region dynamic input
  const renderDynamicInput = (ans) => {
    const tempAnswers = [];

    ans.map((a, index) => {
      const tbIndex = tabIndex + index;
      // render input for text
      tempAnswers.push({
        tabIndex: tbIndex,
        id: field + "." + index + ".text." + locale.lang,
        field: field + "." + index + ".text." + locale.lang,
        type: "text",
        label: t("question.answerselect") + " [" + locale.lang.toUpperCase() + "]",
        renderName: "answers",
        xs: 12,
        sm: 12,
      });

      // render input for desc
      tempAnswers.push({
        tabIndex: tbIndex,
        id: field + "." + index + ".desc." + locale.lang,
        field: field + "." + index + ".desc." + locale.lang,
        type: "text",
        label: t("site.description") + " [" + locale.lang.toUpperCase() + "]",
        renderName: "answers",
        xs: 12,
        sm: 12,
      });
    });

    setInputList(tempAnswers);
  };
  //#endregion

  return (
    <>
      <RenderFieldForm metadata={[renderNumberOfAnswers]} formik={formik} />
      <RenderFieldForm metadata={inputList} formik={formik} />
    </>
  );
};

export default DynamicInputAnswers;

// const DynamicInputAnswers = () => {
//     const [inputList, setInputList] = React.useState([
//       { firstName: "", lastName: "" },
//     ]);

//     // handle input change
//     const handleInputChange = (e, index) => {
//       const { name, value } = e.target;
//       const list = [...inputList];
//       list[index][name] = value;
//       setInputList(list);
//     };

//     // handle click event of the Remove button
//     const handleRemoveClick = (index) => {
//       const list = [...inputList];
//       list.splice(index, 1);
//       setInputList(list);
//     };

//     // handle click event of the Add button
//     const handleAddClick = () => {
//       setInputList([...inputList, { firstName: "", lastName: "" }]);
//     };

//   return (
//     <>
//       {inputList.map((x, i) => {
//         return (
//           <div className="box" key={Helpers.generateKey()}>
//             <input
//               name="firstName"
//               placeholder="Enter First Name"
//               value={x.firstName}
//               onChange={(e) => handleInputChange(e, i)}
//             />
//             <input
//               className="ml10"
//               name="lastName"
//               placeholder="Enter Last Name"
//               value={x.lastName}
//               onChange={(e) => handleInputChange(e, i)}
//             />
//             <div className="btn-box">
//               {inputList.length !== 1 && (
//                 <button className="mr10" onClick={() => handleRemoveClick(i)}>
//                   Remove
//                 </button>
//               )}
//               {inputList.length - 1 === i && (
//                 <button onClick={handleAddClick}>Add</button>
//               )}
//             </div>
//           </div>
//         );
//       })}
//       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//     </>
//   );
// };
