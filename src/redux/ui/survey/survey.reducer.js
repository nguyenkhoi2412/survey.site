import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import response from "@redux/utils/response.helper";
import apiServices from "@services/common.api";

export const SURVEY_GET_BY_FILTER = createAsyncThunk(
  "survey/getbyfilter",
  async (params, thunkAPI) => {
    return await apiServices.getbyfilter(`survey/getbyfilter/`, params);
  }
);

// init state auth
const initialState = response.INITIAL_STATE;

export const survey_Survey = createSlice({
  name: "survey_Survey",
  initialState: initialState,
  reducers: {},
  extraReducers: {
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
  },
});

// export actions to use
export const {} = survey_Survey.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const surveyState = (state) => state.survey_Survey;
//#endregion

export default survey_Survey.reducer;
