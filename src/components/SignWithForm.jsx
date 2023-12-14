import Form from "./Form";

export default function SignWithForm(props) {
  const
    config = {
      ...props,
      btn: {btnText: props.title},
      mod: 'section',
    },
    inputClass = 'form__item form__item_type_' + config.mod;

  return(
    <Form {...config}>
      <input
        className={inputClass}
        type="email"
        placeholder="Correo electrónico"
      />
      <input
        className={inputClass}
        type="password"
        placeholder="Contraseña"
      />
    </Form>
  )
}