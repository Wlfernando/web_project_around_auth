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
    haveInputs = children ? true : false,
    [disabled, setDisabled] = useState(haveInputs),

    btnOff = disabled ? ' button_inactive' : '';

  function handleValidation(e) {
    const
      field = e.currentTarget.elements,
      hasValid = Array(...field).every(input =>
        input.validity.valid
      )

    setDisabled(hasValid ? false : true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(e, () => setDisabled(haveInputs))
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