import React from "react";
import { CloseContext } from "../contexts/CloseContext";
import Form from './Form.jsx'

const PopupWithForm = React.memo(({
  isOpen,
  btnText = 'Guardar',
  onSubmit,
  setDisabled,
  ...props
}) => {
  const
    btnRef = React.useRef(null),

    handleClose = React.useContext(CloseContext);

  function handleSubmit(e, disable) {
    const btn = btnRef.current

    btn.textContent = 'Guardando...'
    onSubmit(() => {
      btn.textContent = btnText
      disable()
    })
  }

  return (
    <div className={'popup' + (isOpen ? ' popup_active' : '')}>
      <div className="popup__wrapper">
        <Form {...props}
          onSubmit={handleSubmit}
          btn={{btnText, btnRef}}
          mod="popup"
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