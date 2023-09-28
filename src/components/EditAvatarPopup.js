import React from "react"
import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = React.memo(({
  isOpen,
  onClose,
  onUpdateAvatar,
  onFieldChge
})=> {
  const
    avatardRef = React.useRef(null),

    [disabled, setDisabled] = React.useState(true),

    errMessage = disabled && 'popup__item-error_active'

  function handleValidation(e) {
    onFieldChge(e, setDisabled)
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
      onChange={handleValidation}
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