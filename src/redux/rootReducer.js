import { combineReducers } from "redux";
//* shared
import gSharedReducer from "@redux/utils/shared.reducer";
import componentReducer from "@components/common/_reducer";

//* dashboard
import authReducer from "@redux/providers/auth.reducer";
import siteReducer from "@redux/providers/site.reducer";
import typeReducer from "@redux/providers/type.reducer";
import categoryReducer from "@redux/providers/category.reducer";
import surveyReducer from "@redux/providers/survey.reducer";
import questionReducer from "@redux/providers/question.reducer";
import currentMenuReducer from "@redux/utils/currentMenu.reducer";

//* survey
import survey_UserAnswerReducer from "@redux/ui/survey/user_answer.reducer";
import survey_SurveyReducer from "@redux/ui/survey/survey.reducer";
import survey_QuestionReducer from "@redux/ui/survey/question.reducer";

const rootReducer = combineReducers({
  //? shared
  ...componentReducer,
  gShared: gSharedReducer,
  //? dashboard
  auth: authReducer,
  site: siteReducer,
  type: typeReducer,
  category: categoryReducer,
  survey: surveyReducer,
  question: questionReducer,
  currentMenu: currentMenuReducer,
  //? survey
  survey_UserAnswer: survey_UserAnswerReducer,
  survey_Survey: survey_SurveyReducer,
  survey_Question: survey_QuestionReducer,
});

export default rootReducer;
