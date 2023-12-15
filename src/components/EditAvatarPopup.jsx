import React, { useContext } from "react"
import PopupWithForm from "./PopupWithForm"
import { PopupOpenContext } from "../contexts/PopupOpenContext";

const EditAvatarPopup = React.memo(({
  onUpdate,
}) => {
  const
    avatarRef = React.useRef(null),

    { avatar } = useContext(PopupOpenContext);

  function handleSubmit(setBtn) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        avatarRef.current.value = ''
        setBtn()
      }, delayTimer)
    }

    onUpdate(setDelay).handleAvatar({avatar: avatarRef.current.value})
  }

  return(
    <PopupWithForm
      title='Cambiar foto de Perfil'
      name={'avatar'}
      isOpen={avatar}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="form__item"
        type="url"
        id="avatar"
        name="avatar"
        required
        placeholder="Enlace del avatar"
      />
      <span className="form__item-error" >
        {avatarRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default EditAvatarPopup