import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "@services/auth";
import { Helpers } from "@utils/helpers";

export const VALIDATE_USER = createAsyncThunk(
  "auth/validateUser",
  async (params, thunkAPI) => {
    return await authServices.validateUser(params);
  }
);

// init state auth
const initialState = {
  isFetching: false,
  ok: true,
  message: "",
  authenticated: false,
  currentUser: null,
  language: "en",
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    SIGN_OUT: (state) => {
      localStorage.removeItem("dashboard");
      return { ...state, ...initialState };
    },
    // UPDATE_USER_LANGUAGE: (state, action) => {
    //   localStorage.setItem(
    //     "userLoggedIn",
    //     JSON.stringify({
    //       ...state,
    //       language: action.payload,
    //     })
    //   );

    //   return {
    //     ...state,
    //     language: action.payload,
    //   };
    // },
  },
  extraReducers: {
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
        message: response.message,
        authenticated: Helpers.checkIsNotNull(results.currentUser),
        currentUser: results.currentUser,
      };

      if (response.ok && results.currentUser) {
        localStorage.setItem(
          "dashboard",
          JSON.stringify({
            currentUser: newState.currentUser,
            accessToken: results.access_token,
            refreshToken: results.refresh_token,
          })
        );
      }

      return newState;
    },
  },
});

// export actions to use
export const { SIGN_OUT } = auth.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const authState = (state) => state.auth;
//#endregion

export default auth.reducer;
