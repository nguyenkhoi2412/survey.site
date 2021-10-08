import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import response from "@redux/utils/response.helper";
import apiServices from "@services/common.api";

export const QUESTION_GET_BY_PAGENO = createAsyncThunk(
  "question/getbypageno",
  async (params, thunkAPI) => {
    return await apiServices.getByPageNo(`question/getbypageno/`, params);
  }
);

export const QUESTION_GET_BY_FILTER = createAsyncThunk(
  "question/getbyfilter",
  async (params, thunkAPI) => {
    return await apiServices.getbyfilter(`question/getbyfilter/`, params);
  }
);

export const QUESTION_INSERT_NEW = createAsyncThunk(
  "question/insertnew",
  async (params, thunkAPI) => {
    return await apiServices.insertnew(`question/insertnew/`, params);
  }
);

export const QUESTION_UPDATE = createAsyncThunk(
  "question/update",
  async (params, thunkAPI) => {
    return await apiServices.update(`question/update/`, params);
  }
);

// init state auth
const initialState = response.INITIAL_STATE;

export const survey_Question = createSlice({
  name: "survey_Question",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //#region QUESTION_GET_BY_PAGENO
    [QUESTION_GET_BY_PAGENO.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [QUESTION_GET_BY_PAGENO.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [QUESTION_GET_BY_PAGENO.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload, {
        total: payload.total,
      });
    },
    //#endregion
    //#region QUESTION_GET_BY_FILTER
    [QUESTION_GET_BY_FILTER.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [QUESTION_GET_BY_FILTER.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [QUESTION_GET_BY_FILTER.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload);
    },
    //#endregion
    //#region QUESTION_INSERT_NEW
    [QUESTION_INSERT_NEW.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [QUESTION_INSERT_NEW.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [QUESTION_INSERT_NEW.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.INSERT(currentState, payload, {
        total: currentState.total + 1,
      });
    },
    //#endregion
    //#region QUESTION_UPDATE
    [QUESTION_UPDATE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [QUESTION_UPDATE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [QUESTION_UPDATE.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.UPDATE(currentState, payload, {
        total: currentState.total,
      });
    },
    //#endregion
  },
});

// export actions to use
export const {} = survey_Question.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const questionState = (state) => state.survey_Question;
//#endregion

export default survey_Question.reducer;
