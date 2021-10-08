//* shared
import backdropSpinReducer from "./BackdropSpin/backdropSpin.reducer";
import drawerReducer from "./Drawer/drawer.reducer";
import stepsnavReducer from "./StepsNav/stepsnav.reducer";

const componentReducer = {
  //? shared
  backdropSpin: backdropSpinReducer,
  drawer: drawerReducer,
  stepsnav: stepsnavReducer,
};

export default componentReducer;
