import "./Answers.less";
import { useTranslation } from "react-i18next";
import {
  Helpers,
  hooksInstance,
  arrayExtension,
  stringExtension,
  objectExtension,
} from "@utils/helpers";
import encrypt from "@utils/encrypt.helper";
import RenderField from "@components/common/Forms/RenderField";
//#region ant design
import { Row, Col, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  QUESTION_GET_BY_PAGENO,
  questionState,
} from "@redux/ui/survey/question.reducer";
import {
  USER_ANSWER_UPDATE,
  userAnswerState,
} from "@redux/ui/survey/user_answer.reducer";
import { PROGRESS_WORKING_CHANGE } from "@redux/utils/shared.reducer";
import { localeState } from "@redux/providers/site.reducer";

const Answers = () => {
  //#region init data/hooks
  const { t } = useTranslation();
  const locale = useSelector(localeState);
  const dispatch = useDispatch();
  let dataState = useSelector(questionState);
  const user = useSelector(userAnswerState);
  const test = user.userAnswer.test;
  let [testWorking, setTestWorking] = React.useState([]);
  const router = hooksInstance.useRouter();

  //* loadQuestion using change state pagination
  //! if error, please check again testWorking
  const [pagination, setPagination] = React.useState({
    stateChange: false,
    current: 1,
    pageSize: 1,
  });
  const [userAnswer, setUserAnswer] = React.useState([]);
  //#endregion

  //#region function call
  // get questions
  const loadQuestions = (cateid) => {
    dispatch(
      QUESTION_GET_BY_PAGENO({
        pageno: pagination.current,
        pagesize: pagination.pageSize,
        query: {
          filterCriteria: { categories_ref: cateid },
          sortCriteria: { created_at: 1 },
        },
      })
    );
  };
  //#endregion

  //#region useHooks
  //* effect init load
  React.useEffect(() => {
    const haveTest = test.filter((t) => !t.complete);

    if (haveTest.length) {
      setTestWorking(haveTest[0]);

      // set pagination
      setPagination({
        ...pagination,
        stateChange: true,
        current: haveTest[0].answers.length + 1,
      });

      // set userAnswers
      setUserAnswer(haveTest[0].answers);
    } else router.push("selections");
  }, []);

  //* effect when user answer
  React.useEffect(() => {
    if (pagination.stateChange) {
      loadQuestions(testWorking.category_id);

      setPagination({
        ...pagination,
        stateChange: false,
      });
    }
  }, [pagination]);

  //* effect progress complete
  React.useEffect(() => {
    dispatch(
      PROGRESS_WORKING_CHANGE({
        total: dataState.total,
        complete: pagination.current - 1,
      })
    );

    //TODO go to results page
    console.log(dataState.total);
    if (dataState.total === userAnswer.length) {
      router.push(
        "/survey/results?topic=" +
          testWorking.category_id +
          "&answers=" +
          encrypt.cryptoJs.encryption_AES(userAnswer)
      );
    }
  }, [dataState.total, pagination]);

  //* effect when user answer
  React.useEffect(() => {
    // assign userAnswer to userAnswerState
    const currentTestWorking = {
      ...testWorking,
      answers: [...userAnswer],
      complete: dataState.total === userAnswer.length,
    };

    // assign tests to user
    const cloneUser = {
      ...user.userAnswer,
      test: arrayExtension.update(test, currentTestWorking),
    };

    const values = objectExtension.diffObjects(cloneUser, user.userAnswer);
    values._id = cloneUser._id;

    // if have test, make a callback api for update
    if (Helpers.checkIsNotNull(values.test)) {
      dispatch(USER_ANSWER_UPDATE(values));
    }
  }, [userAnswer]);
  //#endregion

  //#region functions/events
  const handleAnswers = (target) => {
    setPagination({
      ...pagination,
      stateChange: true,
      current: pagination.current + 1,
    });

    // user answer question
    const { name, value } = target;
    const questId = name.split("_")[1];
    const uAns = {
      _id: Helpers.uuidv4(),
      questionaire: questId,
      selection: [value],
    };

    //* Save user's answer
    // check before save
    const questionsAnswered = userAnswer.filter(
      (quest) => quest.questionaire === questId
    );

    //insert new answers
    setUserAnswer(arrayExtension.insert([...userAnswer], 0, uAns));
  };
  //#endregion

  return (
    <>
      <Row align="middle" className="questions" gutter={[16, 0]}>
        <Col xs={24} className="tblQuestions">
          {dataState.d.map((ques) => {
            const inputForm = {
              field: "ans_" + ques._id,
              type: "radio",
              onChange: handleAnswers,
              options: [],
              xs: 24,
              sm: 24,
            };

            ques.answers.map((ans) => {
              inputForm.options.push({
                value: ans._id,
                text: ans.text[locale.lang],
              });
            });

            return (
              <React.Fragment key={ques._id}>
                <Form>
                  <Row className="tblRow" justify="center">
                    <Col className="tblCol" xs={24}>
                      <Col xs={24} className="tblQuest">
                        <Col xs={24} className="title" align="justify">
                          <span>{ques.title[locale.lang]}</span>
                        </Col>
                        <Col xs={24} className="sub_title">
                          {stringExtension.render(ques.sub_title)[locale.lang]}
                        </Col>
                        <Col
                          xs={24}
                          className="desc"
                          dangerouslySetInnerHTML={{
                            __html: stringExtension.render(ques.desc)[
                              locale.lang
                            ],
                          }}
                        ></Col>
                      </Col>
                      <Col xs={24} className="tblSelections">
                        <RenderField metadata={inputForm} />
                      </Col>
                    </Col>
                  </Row>
                </Form>
              </React.Fragment>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default Answers;
