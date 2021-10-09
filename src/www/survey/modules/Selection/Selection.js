import "./Selection.less";
import { useTranslation } from "react-i18next";
import {
  Helpers,
  hooksInstance,
  objectExtension,
} from "@utils/helpers";
import encrypt from "@utils/encrypt.helper";
import { Tooltip, Row, Col, Space, Typography, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  SURVEY_GET_BY_FILTER,
  surveyState,
} from "@redux/ui/survey/survey.reducer";
import {
  USER_ANSWER_UPDATE,
  userAnswerState,
} from "@redux/ui/survey/user_answer.reducer";
import { localeState } from "@redux/providers/site.reducer";

const { Title } = Typography;
const { Meta } = Card;

const Selection = (surveyInfos) => {
  //#region init data/hooks
  const { t } = useTranslation();
  const locale = useSelector(localeState);
  const dispatch = useDispatch();
  const surveys = useSelector(surveyState);
  const user = useSelector(userAnswerState);
  const [topicSelected, setTopicSelected] = React.useState();
  const [linkToAnswerPage, setLinkToAnswerPage] = React.useState(false);

  const router = hooksInstance.useRouter();
  //#endregion

  //#region function call
  const checkUserHaveTest = (surveyInfos = {}) => {
    let query = {
      survey: surveyInfos,
    };
    
    // clone tests from user
    const cloneTests = [...user.userAnswer.test];

    // get tests not complete
    const testsNotComplete = cloneTests.filter((t) => !t.complete);

    if (testsNotComplete.length) {
      query = {
        survey: testsNotComplete[0],
      };

      router.push(
        "/survey/answers?survey=" + encrypt.cryptoJs.encryption_AES(query)
      );
    } else {
      if (objectExtension.isEmptyObject(surveyInfos)) {
        // Get survey assigned by date
        dispatch(
          SURVEY_GET_BY_FILTER({
            query: {
              start_date: {
                $lte: new Date(),
              },
              end_date: {
                $gte: new Date(),
              },
            },
          })
        );
      } else {
        // update survey to user selected
        const userTest = {
          ...user.userAnswer,
          test: [...user.userAnswer.test, surveyInfos],
        };

        // check changed
        const dataUpdate = objectExtension.diffObjects(
          userTest,
          user.userAnswer
        );
        dataUpdate._id = userTest._id; // re-assign id after compare

        dispatch(USER_ANSWER_UPDATE(dataUpdate));
        setLinkToAnswerPage(true);
      }
    }
  };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    checkUserHaveTest();
  }, []);

  //* Effect if user have update data
  React.useEffect(() => {
    if (!user.isFetching && user.action === "update" && linkToAnswerPage) {
      setLinkToAnswerPage(false);

      router.push(
        "/survey/answers?survey=" +
          encrypt.cryptoJs.encryption_AES(topicSelected)
      );
    }
  }, [user]);
  
  React.useEffect(() => {
    checkUserHaveTest(topicSelected);
  }, [topicSelected]);
  //#endregion

  //#region functions/events
  const gotoAnswers = (survey, cate) => {
    // create survey user selected
    setTopicSelected({
      _id: Helpers.uuidv4(),
      category_id: cate._id,
      name: cate.title[locale.lang],
      start_date: new Date(),
      duration: survey.duration,
      finish_time: survey.duration,
      complete: false,
      answers: [],
    });

    // checkUserHaveTest(test);
  };
  //#endregion

  return (
    <>
      <Row
        justify="center"
        align="middle"
        className="selection"
        gutter={[16, 0]}
      >
        <Col xs={24} sm={12} className="intros">
          <Space direction="vertical" align="left">
            <Title level={1}>{t("survey.getanswerssurvey")}</Title>
            <Title level={5}>{t("survey.surveyintros")}</Title>
          </Space>
        </Col>
        <Col xs={24} sm={12} className="select-test">
          <Row justify="center" align="middle">
            {surveys.d.map((sv) => {
              return (
                <React.Fragment key={sv._id}>
                  <Col
                    xs={24}
                    align="left"
                    style={{ paddingLeft: 8 }}
                    className="survey-title"
                  >
                    <Title level={5}>{sv.title[locale.lang]}:</Title>
                  </Col>
                  {/* //? Render tests */}
                  <Row gutter={[8, 8]} className="card-container">
                    {sv.categories_ref.map((cate) => {
                      const colNum = 12;
                      return (
                        <Col key={cate._id} xs={colNum}>
                          <Card
                            style={{
                              backgroundColor: Helpers.generateColor("dark"),
                            }}
                            onClick={() => gotoAnswers(sv, cate)}
                          >
                            <Tooltip title={cate.title[locale.lang]}>
                              <Meta
                                title={cate.title[locale.lang]}
                                description={
                                  t("survey.timeduration") +
                                  ": " +
                                  sv.duration +
                                  "min."
                                }
                              />
                            </Tooltip>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </React.Fragment>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Selection;
