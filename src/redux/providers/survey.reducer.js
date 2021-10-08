import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import response from "@redux/utils/response.helper";
import apiServices from "@services/common.api";

export const SURVEY_GET_BY_PAGENO = createAsyncThunk(
  "survey/getbypageno",
  async (params, thunkAPI) => {
    return await apiServices.getByPageNo(`survey/getbypageno/`, params);
  }
);

export const SURVEY_GET_BY_FILTER = createAsyncThunk(
  "survey/getbyfilter",
  async (params, thunkAPI) => {
    return await apiServices.getbyfilter(`survey/getbyfilter/`, params);
  }
);

export const SURVEY_INSERT_NEW = createAsyncThunk(
  "survey/insertnew",
  async (params, thunkAPI) => {
    return await apiServices.insertnew(`survey/insertnew/`, params);
  }
);

export const SURVEY_UPDATE = createAsyncThunk(
  "survey/update",
  async (params, thunkAPI) => {
    return await apiServices.update(`survey/update/`, params);
  }
);

export const SURVEY_DELETE = createAsyncThunk(
  "survey/delete",
  async (params, thunkAPI) => {
    return await apiServices.delete(`survey/delete/`, params);
  }
);

// init state auth
const initialState = response.INITIAL_STATE;

export const survey = createSlice({
  name: "survey",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //#region SURVEY_GET_BY_PAGENO
    [SURVEY_GET_BY_PAGENO.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SURVEY_GET_BY_PAGENO.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SURVEY_GET_BY_PAGENO.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload, {
        total: payload.total,
      });
    },
    //#endregion
    //#region SURVEY_GET_BY_FILTER
    [SURVEY_GET_BY_FILTER.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SURVEY_GET_BY_FILTER.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SURVEY_GET_BY_FILTER.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload);
    },
    //#endregion
    //#region SURVEY_INSERT_NEW
    [SURVEY_INSERT_NEW.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SURVEY_INSERT_NEW.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SURVEY_INSERT_NEW.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.INSERT(currentState, payload, {
        total: currentState.total + 1,
      });
    },
    //#endregion
    //#region SURVEY_UPDATE
    [SURVEY_UPDATE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SURVEY_UPDATE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SURVEY_UPDATE.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.UPDATE(currentState, payload, {
        total: currentState.total,
      });
    },
    //#endregion
    //#region SURVEY_DELETE
    [SURVEY_DELETE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SURVEY_DELETE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SURVEY_DELETE.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.DELETE(currentState, payload, {
        total: currentState.total - 1,
      });
    },
    //#endregion
  },
});

// export actions to use
export const { } = survey.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const surveyState = (state) => state.survey;
//#endregion

export default survey.reducer;
