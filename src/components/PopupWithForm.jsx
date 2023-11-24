import React from "react";

const PopupWithForm = React.memo(({
  isOpen,
  name,
  title,
  children,
  textBtn,
  onClose,
  onSubmit,
  onChange,
  isDisabled
}) => {
  const
    btnRef = React.useRef(null),
    btnOff = isDisabled ? ' button_inactive' : '';

  function handleSubmit(e) {
    const btn = btnRef.current

    e.preventDefault()
    btn.textContent = 'Guardando...'
    onSubmit(() => btn.textContent = textBtn)
  }

  return (
    <div className={'popup' + (isOpen ? ' popup_active' : '')}>
      <form
        className={`popup__container popup__container_type_${name}`}
        name={name}
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset
          className="popup__content"
          onChange={onChange}
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            type="submit"
            className={"button button__submit" + btnOff}
            name="saveBtn"
            disabled={isDisabled}
            ref={btnRef}
          >
            {textBtn ??= 'Guardar'}
          </button>
        </fieldset>
        <button
          type="button"
          className="button button__close button__close_place_form"
          onClick={onClose}
        ></button>
      </form>
    </div>
  )
})

export default PopupWithForm