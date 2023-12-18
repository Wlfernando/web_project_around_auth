import SignWithForm from "./SignWithForm";

export default function Login({
  onSubmit,
}) {
  return (
    <SignWithForm
      name= "sign-in"
      title= "Inicia sesión"
      para= '¿Aún no eres miembro? Regístrate'
      onSubmit={onSubmit}
    />
  )
}