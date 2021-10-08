import { createSlice, current } from "@reduxjs/toolkit";
import { arrayExtension } from "@utils/helpers";

// init state
const initialState = {
  data: [],
};

export const stepsnav = createSlice({
  name: "stepsnav",
  initialState: initialState,
  reducers: {
    STEPSNAV_INSERT_NEW: (state, action) => {
      return { ...state, data: action.payload };
    },
    STEPSNAV_UPDATE_NEXT: (state, action) => {
      const tempSteps = current(state);
      // find current process & change status
      //* process/wait/finish/error
      let steps = [...tempSteps.data];
      let currentProcess = steps.filter((s) => s.status === "process");
      if (currentProcess.length) {
        let temp = { ...currentProcess[0] };
        temp.status = "finish";
        steps = arrayExtension.update(steps, temp);
      }

      // find status is wait
      const waitArray = steps.filter((s) => s.status === "wait");
      if (waitArray.length) {
        let waitFirst = { ...waitArray[0] };
        waitFirst.status = "process";
        steps = update(steps, waitFirst);
      }

      return { ...state, data: steps };
    },
    STEPSNAV_INITIAL: () => {
      return {
        ...initialState,
      };
    },
  },
});

// export actions to use
export const { STEPSNAV_INSERT_NEW, STEPSNAV_UPDATE_NEXT, STEPSNAV_INITIAL } =
  stepsnav.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const stepsnavState = (state) => state.stepsnav;
//#endregion

export default stepsnav.reducer;

const update = (arr, newItem, field = "_id") => {
  return arr.map((item) => {
    if (item[field] === newItem[field]) {
      return {
        ...item,
        ...newItem,
      };
    }

    return item;
  });
};
