import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteContext } from "../contexts/RouteContext";

export default function ProtectedRoute({
  children,
  ...props
}) {
  const { login } = useContext(RouteContext);

  return (
    <Route {...props}>
      {sessionStorage.getItem('email') ? children : <Redirect to={login} />}
    </Route>
  )
}