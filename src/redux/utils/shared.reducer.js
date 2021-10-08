import { createSlice, current } from "@reduxjs/toolkit";

// init state
const initialState = {
  sider: {
    collapsed: false,
  },
  alert: {
    show: false,
    type: "success",
    message: "",
    description: "",
  },
  progressWorking: {
    total: 100,
    complete: 0,
  },
};

export const gShared = createSlice({
  name: "gShared",
  initialState: initialState,
  reducers: {
    //* SIDER
    TOGGLE_SIDER: (state, action) => {
      const tempState = current(state);

      return {
        ...tempState,
        sider: {
          ...tempState.sider,
          collapsed: action.payload,
        },
      };
    },
    //* ALERT
    TOGGLE_ALERT: (state, action) => {
      const tempState = current(state);

      return {
        ...tempState,
        alert: {
          ...tempState.alert,
          show: action.payload.show,
          type:
            action.payload.type === undefined ? "success" : action.payload.type,
          message:
            action.payload.message === undefined
              ? "No content"
              : action.payload.message,
          description:
            action.payload.description === undefined
              ? ""
              : action.payload.description,
        },
      };
    },
    //* PROGRESS_WORKING
    PROGRESS_WORKING_CHANGE: (state, action) => {
      const tempState = current(state);
      
      return {
        ...tempState,
        progressWorking: {
          ...tempState.progressWorking,
          total: action.payload.total || tempState.total,
          complete: action.payload.complete || tempState.complete,
        },
      };
    },
  },
});

// export actions to use
export const { TOGGLE_SIDER, TOGGLE_ALERT, PROGRESS_WORKING_CHANGE } =
  gShared.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const siderState = (state) => state.gShared.sider;
export const alertState = (state) => state.gShared.alert;
export const progressWorkingState = (state) => state.gShared.progressWorking;
//#endregion

export default gShared.reducer;
