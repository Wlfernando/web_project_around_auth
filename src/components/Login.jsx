import { Link } from "react-router-dom";
import SignWithForm from "./SignWithForm";
import { useContext } from "react";
import { RouteContext } from "../contexts/RouteContext";

export default function Login({
  onSubmit,
}) {
  const
    { register } = useContext(RouteContext),
    
    link = <p className="form__question">
      ¿Aún no eres miembro? Regístrate
      <Link className="link" to={register}> aqui</Link>.
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