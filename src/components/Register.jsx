import SignWithForm from "./SignWithForm";

export default function Register({
  onSubmit,
}) {
  return (
    <>
      <SignWithForm
        name="sign-up"
        title="Regístrate"
        para="¿Ya eres miembro? Inicia sesión"
        onSubmit={onSubmit}
      />
    </>
  )
}