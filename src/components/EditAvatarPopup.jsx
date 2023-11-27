import React, { useContext } from "react"
import PopupWithForm from "./PopupWithForm"
import { PopupOpenContext } from "../contexts/PopupOpenContext";

const EditAvatarPopup = React.memo(({
  onClose,
  onUpdate,
  onValidation,
}) => {
  const
    avatarRef = React.useRef(null),

    [disabled, setDisabled] = React.useState(true),

    { avatar } = useContext(PopupOpenContext);

  function handleChange(e) {
    onValidation(e, setDisabled)
  }

  function handleSubmit(setText) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        avatarRef.current.value = ''
        setText()
        setDisabled(true)
      }, delayTimer)
    }

    onUpdate(setDelay).handleAvatar({avatar: avatarRef.current.value})
  }

  return(
    <PopupWithForm
      title='Cambiar foto de Perfil'
      name={'avatar'}
      isOpen={avatar}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={disabled}
      onChange={handleChange}
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