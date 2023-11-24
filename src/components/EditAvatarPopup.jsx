import React from "react"
import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = React.memo(({
  isOpen,
  onClose,
  onUpdate,
  onFieldChge
}) => {
  const
    avatarRef = React.useRef(null),

    [disabled, setDisabled] = React.useState(true);

  function handleValidation(e) {
    onFieldChge(e, setDisabled)
  }

  function handleSubmit(e) {
    e.preventDefault()

    function setDelay(delayTimer) {
      setTimeout(() => {
        avatarRef.current.value = ''
        setDisabled(true)
      }, delayTimer)
    }

    onUpdate(setDelay).handleAvatar({avatar: avatarRef.current.value})
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
        ref={avatarRef}
        className="popup__item"
        type="url"
        id="avatar"
        name="avatar"
        required
        placeholder="Enlace del avatar"
      />
      <span
        className="popup__item-error"
      >
        {disabled && avatarRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default EditAvatarPopup