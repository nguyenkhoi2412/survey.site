import { createSlice } from "@reduxjs/toolkit";

// init state
const initialState = {
  open: false,
  name: "",
  config: {},
};

export const drawer = createSlice({
  name: "drawer",
  initialState: initialState,
  reducers: {
    OPEN_DRAWER: (state, action) => {
      return {
        ...state,
        open: true,
        name: action.payload.name || "",
        config: action.payload.config || {},
      };
    },
    HIDE_DRAWER: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { OPEN_DRAWER, HIDE_DRAWER } = drawer.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const drawerState = (state) => state.drawer;
//#endregion

export default drawer.reducer;
