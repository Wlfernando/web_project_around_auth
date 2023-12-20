import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  children,
  ...props
}) {
  return (
    <Route {...props}>
      {sessionStorage.getItem('email') ? children : <Redirect to='/signin' />}
    </Route>
  )
}