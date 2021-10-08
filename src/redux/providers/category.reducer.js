import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import response from "@redux/utils/response.helper";
import apiServices from "@services/common.api";
import cateServices from "@services/category";
import { arrayExtension } from "@utils/helpers";

export const CATEGORY_GET_BY_PAGENO = createAsyncThunk(
  "category/getbypageno",
  async (params, thunkAPI) => {
    return await apiServices.getByPageNo(`category/getbypageno/`, params);
  }
);

export const CATEGORY_GET_BY_ID = createAsyncThunk(
  "category/getbyid",
  async (params, thunkAPI) => {
    return await apiServices.getbyid(`category/getbyid/`, params);
  }
);

export const CATEGORY_GET_BY_TYPE = createAsyncThunk(
  "category/getbytype",
  async (params, thunkAPI) => {
    return await cateServices.getByType(`category/getbytype/`, params);
  }
);

export const CATEGORY_INSERT_NEW = createAsyncThunk(
  "category/insertnew",
  async (params, thunkAPI) => {
    return await apiServices.insertnew(`category/insertnew/`, params);
  }
);

export const CATEGORY_UPDATE = createAsyncThunk(
  "category/update",
  async (params, thunkAPI) => {
    return await apiServices.update(`category/update/`, params);
  }
);

export const CATEGORY_DELETE = createAsyncThunk(
  "category/delete",
  async (params, thunkAPI) => {
    return await apiServices.delete(`category/delete/`, params);
  }
);

// init state auth
const initialState = response.INITIAL_STATE;

export const category = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //#region CATEGORY_GET_BY_PAGENO
    [CATEGORY_GET_BY_PAGENO.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [CATEGORY_GET_BY_PAGENO.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [CATEGORY_GET_BY_PAGENO.fulfilled]: (state, action) => {
      const payload = action.payload;

      const hierarchy = arrayExtension.buildHierarchies(payload.rs);

      return response.GET(state, payload, {
        total: payload.total,
        hierarchy: hierarchy,
      });
    },
    //#endregion
    //#region CATEGORY_GET_BY_ID
    [CATEGORY_GET_BY_ID.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [CATEGORY_GET_BY_ID.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [CATEGORY_GET_BY_ID.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload);
    },
    //#endregion
    //#region CATEGORY_GET_BY_TYPE
    [CATEGORY_GET_BY_TYPE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [CATEGORY_GET_BY_TYPE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [CATEGORY_GET_BY_TYPE.fulfilled]: (state, action) => {
      const payload = action.payload;

      return response.GET(state, payload);
    },
    //#endregion
    //#region CATEGORY_INSERT_NEW
    [CATEGORY_INSERT_NEW.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [CATEGORY_INSERT_NEW.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [CATEGORY_INSERT_NEW.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.INSERT(currentState, payload, {
        total: currentState.total + 1,
      });
    },
    //#endregion
    //#region CATEGORY_UPDATE
    [CATEGORY_UPDATE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [CATEGORY_UPDATE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [CATEGORY_UPDATE.fulfilled]: (state, action) => {
      const payload = action.payload;
      const currentState = current(state);

      return response.UPDATE(currentState, payload, {
        total: currentState.total,
      });
    },
    //#endregion
    //#region CATEGORY_DELETE
    [CATEGORY_DELETE.pending]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [CATEGORY_DELETE.rejected]: (state) => {
      return {
        ...state,
        isFetching: false,
      };
    },
    [CATEGORY_DELETE.fulfilled]: (state, action) => {
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
export const {} = category.actions;

//#region The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const categoryState = (state) => state.category;
//#endregion

export default category.reducer;
