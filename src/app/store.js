import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@redux/rootReducer";
import thunk from "redux-thunk";

export default configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "@redux/reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const configureStore = (initialState = {}) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk))
//   );
// };
// export default configureStore;
