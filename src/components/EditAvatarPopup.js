import React from "react"
import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = React.memo(({isOpen, onClose, onUpdateAvatar})=> {
  const
    avatardRef = React.useRef(null),

    [disabled, setDisabled] = React.useState(true),

    errMessage = disabled && 'popup__item-error_active'

  function handleFieldChange(e) {
    const
      field = e.currentTarget.elements,
      hasValid = Array(...field).every(input=>
        input.validity.valid
      )

    if(hasValid)
      setDisabled(false)
    else
      setDisabled(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({avatar: avatardRef.current.value})
    setTimeout(()=> {
      avatardRef.current.value = ''
      setDisabled(true)
    }, 1250)
  }

  return(
    <PopupWithForm
      title='Cambiar foto de Perfil'
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={disabled}
      onChange={handleFieldChange}
    >
      <input
        ref={avatardRef}
        className="popup__item"
        type="url"
        id="avatar"
        name="avatar"
        required
        placeholder="Enlace del avatar"
      />
      <span
        className={"popup__item-error avatar-error " + errMessage}
      >
        {avatardRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default EditAvatarPopup