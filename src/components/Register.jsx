import InfoToolTip from "./InfoToolTip";
import SignWithForm from "./SignWithForm";

export default function Register({
  onSubmit,
  onRef,
}) {
  return (
    <>
      <SignWithForm
        name="sign-up"
        title="Regístrate"
        para="¿Ya eres miembro? Inicia sesión"
        onSubmit={onSubmit}
      />
      <InfoToolTip onRef={onRef}/>
    </>
  )
}