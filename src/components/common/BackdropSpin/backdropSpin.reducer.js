import { createSlice } from "@reduxjs/toolkit";

// init state
const initialState = {
  open: false,
  type: "spin",
  tip: "",
  size: "large",
  fontSize: "45",
};

export const backdropSpin = createSlice({
  name: "backdropSpin",
  initialState: initialState,
  reducers: {
    SHOW_SPIN_BACKDROP: (state, action) => {
      return {
        ...state,
        open: true,
        type: action.payload.type,
        tip: action.payload.tip,
        size: action.payload.size,
        fontSize: action.payload.fontSize,
      };
    },
    HIDE_SPIN_BACKDROP: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { SHOW_SPIN_BACKDROP, HIDE_SPIN_BACKDROP } =
  backdropSpin.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const backdropSpinState = (state) => state.backdropSpin;
//#endregion

export default backdropSpin.reducer;
