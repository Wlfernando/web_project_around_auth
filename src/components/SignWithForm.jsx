import { useRef } from "react";
import Form from "./Form";

export default function SignWithForm(props) {
  const
    emailRef = useRef(null),
    passwordRef = useRef(null),

    config = {
      ...props,
      btn: {btnText: props.title},
      mod: 'section',
    },
    inputClass = 'form__item form__item_type_' + config.mod;

  function handleSubmit(e, disable) {
    config.onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })

    e.currentTarget.reset()
    disable()
  }

  return(
    <Form {...config}
    onSubmit={handleSubmit}
    >
      <input
        className={inputClass}
        type="email"
        placeholder="Correo electrónico"
        required
        ref={emailRef}
      />
      <input
        className={inputClass}
        type="password"
        placeholder="Contraseña"
        required
        minLength='4'
        ref={passwordRef}
      />
    </Form>
  )
}