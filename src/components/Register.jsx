import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SignWithForm from "./SignWithForm";

export default function Register({
  onSubmit,
}) {
  const link = <p className="form__question">
    ¿Ya eres miembro? ¡Inicia sesión
    <Link to="/signin" className="link"> aqui</Link>!
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