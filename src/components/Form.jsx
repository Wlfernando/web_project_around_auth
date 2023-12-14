export default function Form({
  name,
  title,
  mod,
  children,
  isDisabled,
  para,
  onSubmit,
  onValidation,
  btn: {
    btnText,
    btnRef,
  },
}) {
  const btnOff = isDisabled ? ' button_inactive' : '';

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit()
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
        onChange={onValidation}
      >
        <h3 className={`form__title form__title_type_${mod}`}>{title}</h3>
        {children}
      </fieldset>
      <button
        type="submit"
        className={`button button__submit button__submit_type_${mod} ${btnOff}`}
        disabled={isDisabled}
        ref={btnRef}
      >
        {btnText ??= 'Guardar'}
      </button>
      {para && <p className="form__question">{para}</p>}
    </form>
  )
}