import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  children,
  ...props
}) {
  return (
    <Route {...props}>
      {localStorage.getItem('email') ? children : <Redirect to='/signin' />}
    </Route>
  )
}