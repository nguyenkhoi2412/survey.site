import "./Results.less";
import { useTranslation } from "react-i18next";
import encrypt from "@utils/encrypt.helper";
import { hooksInstance } from "@utils/helpers";
import { Row, Col, Result, Button, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  QUESTION_GET_BY_FILTER,
  questionState,
} from "@redux/ui/survey/question.reducer";

const Results = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const questions = useSelector(questionState);

  const [resultUserAnswer, setResultUserAnswer] = React.useState({
    total: 0,
    correct: 0,
    percent: 0,
  });

  const router = hooksInstance.useRouter();
  const userAnswers = encrypt.cryptoJs.decryption_AES(router.query.answers);
  const categoryId = router.query.topic;

  //#region useEffects
  //* get questions by categoryid
  React.useEffect(() => {
    dispatch(
      QUESTION_GET_BY_FILTER({
        query: { categories_ref: categoryId },
      })
    );
  }, []);

  //* check result user answer
  React.useEffect(() => {
    if (questions.d.length && !questions.isFetching) {
      // set total for object
      resultUserAnswer.total = questions.d.length;
      let correctNum = 0;
      // calculate number of question correct
      userAnswers.map((ans) => {
        const ques = questions.d.filter((q) => q._id === ans.questionaire);

        //check results
        ans.selection.map((sel) => {
          const rs = ques[0].answers.filter((a) => a._id === sel);
          if (rs[0].correct) correctNum++;
        });
      });

      setResultUserAnswer({
        total: questions.d.length,
        correct: correctNum,
        percent: Math.round((correctNum * 100) / questions.d.length),
      });
    }
  }, [questions]);
  //#endregion

  return (
    <>
      <Row align="middle" justify="center" className="results" gutter={[16, 0]}>
        <Col xs={24} sm={12} className="container">
          <Result
            status="success"
            // icon={<SmileOutlined />}
            title={
              <>
                {t("survey.greatdone")}
                <p>
                  {t("survey.yourresult") +
                    ": " +
                    resultUserAnswer.percent +
                    "%"}
                </p>
              </>
            }
            extra={[
              <Button
                type="primary"
                key="complete"
                onClick={() => router.push("selections")}
              >
                {t("common.complete")}
              </Button>,
            ]}
          />
          ,
        </Col>
      </Row>
    </>
  );
};

export default Results;
