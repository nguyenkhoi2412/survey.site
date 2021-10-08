import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import response from "@redux/utils/response.helper";
import siteServices from "@services/site";

export const SITE_GET_BY_NAME = createAsyncThunk(
  "site/getbyname",
  async (params, thunkAPI) => {
    return await siteServices.getByName(params);
  }
);

// init state auth
const initialState = response.INITIAL_STATE;

export const site = createSlice({
  name: "site",
  initialState: initialState,
  extraReducers: {
    [SITE_GET_BY_NAME.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [SITE_GET_BY_NAME.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [SITE_GET_BY_NAME.fulfilled]: (state, action) => {
      const payload = action.payload;
      const _locale = payload.rs.locale.filter((lc) => lc.default === true);

      return response.GET(state, payload, {
        locale: _locale
          ? _locale[0]
          : {
              language_name: "English",
              lang: "en",
              code: "en-US",
              date_format: "MM/DD/YYYY",
              time_format: "HH:mm",
            },
      });
    },
  },
});

// export actions to use
export const {} = site.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const siteState = (state) => state.site;
export const localeState = (state) => state.site.locale;
//#endregion

export default site.reducer;
