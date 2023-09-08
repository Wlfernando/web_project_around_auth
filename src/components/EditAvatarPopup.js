import React from "react"
import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = React.memo(({isOpen, onClose, onUpdateAvatar})=> {
  const avatardRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({avatar: avatardRef.current.value})
    setTimeout(()=> avatardRef.current.value = '', 1250)
  }

  return(
    <PopupWithForm
      title='Cambiar foto de Perfil'
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
      <span className="popup__item-error avatar-error"></span>
    </PopupWithForm>
  )
})

export default EditAvatarPopup