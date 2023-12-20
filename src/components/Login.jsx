import { Link } from "react-router-dom";
import SignWithForm from "./SignWithForm";

export default function Login({
  onSubmit,
}) {
  const link = <p className="form__question">
    ¿Aún no eres miembro? Regístrate
    <Link className="link" to='/signup'> aqui</Link>.
  </p>;

  return (
    <SignWithForm
      name= "sign-in"
      title= "Inicia sesión"
      para= {link}
      onSubmit={onSubmit}
    />
  )
}