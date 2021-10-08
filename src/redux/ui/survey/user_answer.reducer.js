import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import gVariables from "@stores/shared/variables";
import authServices from "@services/user_answer";
import apiServices from "@services/common.api";
import response from "@redux/utils/response.helper";
import { Helpers } from "@utils/helpers";

export const VALIDATE_USER = createAsyncThunk(
  "user/answer/validate",
  async (params, thunkAPI) => {
    return await authServices.validateUser(params);
  }
);

export const USER_ANSWER_GET_BY_FILTER = createAsyncThunk(
  "user/answer/getbyfilter",
  async (params, thunkAPI) => {
    return await apiServices.getbyfilter(`user/answer/getbyfilter/`, params);
  }
);

export const USER_ANSWER_GET_BY_ID = createAsyncThunk(
  "user/answer/getbyid",
  async (params, thunkAPI) => {
    return await apiServices.getbyid(`user/answer/getbyid/`, params);
  }
);

// export const USER_ANSWER_INSERT_NEW = createAsyncThunk(
//   "question/insertnew",
//   async (params, thunkAPI) => {
//     return await apiServices.insertnew(`question/insertnew/`, params);
//   }
// );

export const USER_ANSWER_UPDATE = createAsyncThunk(
  "user/answer/update",
  async (params, thunkAPI) => {
    return await apiServices.update(`user/answer/update/`, params);
  }
);

// init state userAnswer
const storeName = "survey";
const getLocalUserInfos = () => {
  if (localStorage.getItem(storeName)) {
    return JSON.parse(localStorage.getItem(storeName)).currentUser;
  }
  return null;
};

const initialState = {
  isFetching: false,
  ok: true,
  message: "",
  authenticated: false,
  userAnswer: getLocalUserInfos(),
};

export const survey_UserAnswer = createSlice({
  name: "survey_UserAnswer",
  initialState: initialState,
  reducers: {
    SIGN_OUT: (state) => {
      localStorage.removeItem(storeName);
      return { ...state, ...initialState };
    },
    USER_ANSWER_STATIC: (state, action) => {
      return {
        ...state,
        isFetching: false,
        ok: true,
        message: "ok",
        authenticated: Helpers.checkIsNotNull(action.payload.currentUser),
        userAnswer: action.payload.currentUser,
      };
    },
  },
  extraReducers: {
    //#region VALIDATE_USER
    [VALIDATE_USER.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [VALIDATE_USER.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [VALIDATE_USER.fulfilled]: (state, action) => {
      const response = action.payload;
      const results = response.rs;

      const newState = {
        ...state,
        isFetching: false,
        ok: response.ok,
        action: gVariables.GET,
        message: response.message,
        authenticated: Helpers.checkIsNotNull(results.userAnswer),
        userAnswer: results.userAnswer,
      };

      if (response.ok && results.userAnswer) {
        localStorage.setItem(
          storeName,
          JSON.stringify({
            accessToken: results.access_token,
            refreshToken: results.refresh_token,
            currentUser: results.userAnswer,
          })
        );
      }

      return newState;
    },
    //#endregion
    //#region USER_ANSWER_GET_BY_FILTER
    [USER_ANSWER_GET_BY_FILTER.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [USER_ANSWER_GET_BY_FILTER.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [USER_ANSWER_GET_BY_FILTER.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload);
    },
    //#endregion
    //#region USER_ANSWER_GET_BY_ID
    [USER_ANSWER_GET_BY_ID.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [USER_ANSWER_GET_BY_ID.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [USER_ANSWER_GET_BY_ID.fulfilled]: (state, action) => {
      const response = action.payload;
      const results = response.rs;

      const newState = {
        ...state,
        isFetching: false,
        ok: response.ok,
        message: response.message,
        action: gVariables.GET,
        authenticated: Helpers.checkIsNotNull(results),
        userAnswer: results,
      };

      return newState;
    },
    //#endregion
    //#region USER_ANSWER_UPDATE
    [USER_ANSWER_UPDATE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [USER_ANSWER_UPDATE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [USER_ANSWER_UPDATE.fulfilled]: (state, action) => {
      const response = action.payload;
      const currentState = current(state);

      const newState = {
        ...currentState,
        isFetching: false,
        ok: response.ok,
        action: gVariables.UPDATE,
        message: response.message,
        authenticated: Helpers.checkIsNotNull(response.rs[0]),
        userAnswer: response.rs[0],
      };

      return newState;
    },
    //#endregion
  },
});

// export actions to use
export const { USER_ANSWER_STATIC, SIGN_OUT } = survey_UserAnswer.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const userAnswerState = (state) => state.survey_UserAnswer;
export const userAnswerTestState = (state) =>
  state.survey_UserAnswer.userAnswer.test;
//#endregion

export default survey_UserAnswer.reducer;
