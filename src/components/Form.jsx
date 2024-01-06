import { useState } from "react";

export default function Form({
  name,
  title,
  mod,
  children,
  para,
  onSubmit,
  btn: {
    btnText,
    btnRef,
  },
}) {
  const
    hasInputs = Boolean(children),
    [disabled, setDisabled] = useState(hasInputs),

    btnOff = disabled ? ' button_inactive' : '';

  function handleValidation(e) {
    const
      fieldset = e.currentTarget.elements,
      isValid = Array(...fieldset).every(input =>
        input.validity.valid
      )

    setDisabled(!isValid)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(e, () => setDisabled(hasInputs))
  }

  return (
    <form
      className={`form form_type_${mod}`}
      name={name}
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset
        className={`form__fieldset form__fieldset_type_${mod}`}
        onChange={handleValidation}
      >
        <h3 className={`form__title form__title_type_${mod}`}>{title}</h3>
        {children}
      </fieldset>
      <button
        type="submit"
        className={`button button__submit button__submit_type_${mod} ${btnOff}`}
        disabled={disabled}
        ref={btnRef}
      >
        {btnText}
      </button>
      {para}
    </form>
  )
}