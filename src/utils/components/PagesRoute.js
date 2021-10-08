import { Route, Redirect } from "react-router-dom";
import { CURRENT_MODULES } from "@app/routes";
import { hooksInstance } from "@utils/helpers";

const PagesRoute = ({ children, ...rest }) => {
  React.useEffect(() => {
    document.title = rest.title;
  }, [rest.title]);

  switch (rest.public) {
    case true:
      return <Route {...rest}>{children}</Route>;

    default:
      return isAuthenticated() ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard/login",
            state: { from: location },
          }}
        />
      );
  }
};

export default PagesRoute;

const isAuthenticated = () => {
  const module = CURRENT_MODULES();
  
  if (!localStorage.getItem(module)) {
    return <Redirect to={"/" + module + "/login"} />;
  }
  else return true;
};
