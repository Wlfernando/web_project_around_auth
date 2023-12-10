import React from "react";
import { CloseContext } from "../contexts/CloseContext";
import Form from './Form.jsx'

const PopupWithForm = React.memo(({
  isOpen,
  textBtn,
  onSubmit,
  setDisabled,
  ...props
}) => {
  const
    btnRef = React.useRef(null),

    handleClose = React.useContext(CloseContext);

  function handleValidation(e) {
    const
    field = e.currentTarget.elements,
    hasValid = Array(...field).every(input =>
      input.validity.valid
    )

  setDisabled(hasValid ? false : true)
  }

  function handleSubmit() {
    const btn = btnRef.current

    btn.textContent = 'Guardando...'
    onSubmit(() => btn.textContent = textBtn)
  }

  return (
    <div className={'popup' + (isOpen ? ' popup_active' : '')}>
      <div className="popup__wrapper">
        <Form {...props}
          onValidation={handleValidation}
          onSubmit={handleSubmit}
          btn={{textBtn, btnRef}}
        />
        <button
          type="button"
          className="button button__close button__close_place_form"
          onClick={handleClose}
        ></button>
      </div>
    </div>
  )
})

export default PopupWithForm