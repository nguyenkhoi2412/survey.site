import { createSlice } from "@reduxjs/toolkit";

export const currentMenu = createSlice({
  name: "currentMenu",
  initialState: {
    topMenu: "",
    childMenu: "",
  },
  reducers: {
    UPDATE_MENU_ACTIVE: (state, action) => {
      return {
        ...state,
        topMenu: action.payload.topMenu,
        childMenu: action.payload.childMenu,
      };
    },
  },
});

// export actions to use
export const { UPDATE_MENU_ACTIVE } = currentMenu.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const currentMenuState = (state) => state.currentMenu;
//#endregion

export default currentMenu.reducer;
