import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SignWithForm from "./SignWithForm";
import { useContext } from "react";
import { RouteContext } from "../contexts/RouteContext";

export default function Register({
  onSubmit,
}) {
  const
    { login } = useContext(RouteContext),

    link = <p className="form__question">
      ¿Ya eres miembro? ¡Inicia sesión
      <Link to={login} className="link"> aqui</Link>!
    </p>

  return (
    <>
      <SignWithForm
        name="sign-up"
        title="Regístrate"
        para={link}
        onSubmit={onSubmit}
      />
    </>
  )
}