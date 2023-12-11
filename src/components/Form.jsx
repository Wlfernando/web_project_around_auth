export default function Form({
  name,
  title,
  children,
  isDisabled,
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
      className="form form_popup"
      name={name}
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset
        className="form__fieldset"
        onChange={onValidation}
      >
        <h3 className="form__title">{title}</h3>
        {children}
        <button
          type="submit"
          className={"button button__submit" + btnOff}
          disabled={isDisabled}
          ref={btnRef}
        >
          {btnText ??= 'Guardar'}
        </button>
      </fieldset>
    </form>
  )
}