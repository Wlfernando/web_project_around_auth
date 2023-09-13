import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

const EditProfilePopup = React.memo(({isOpen, onClose, onUpdateUser})=> {
  const
    [name, setName] = React.useState(''),
    [description, setDescription] = React.useState(''),
    [disabled, setDisabled] = React.useState(true),

    {name: nameFromApi, about} = React.useContext(CurrentUserContext)

  React.useEffect(()=> {
    setName(nameFromApi ?? '')
    setDescription(about ?? '')
  }, [nameFromApi, about])

  function handleFieldChange(e) {
    const
      field = e.target,
      valid = field.validity.valid

    if(valid)
      setDisabled(false)
    else
      setDisabled(true)
  }

  function handleChange(e) {
    const input = e.target
    return {
      name() {setName(input.value)},
      about() {setDescription(input.value)}
    }[input.name]()
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
    setTimeout(setDisabled, 1250, true)
  }

  return (
    <PopupWithForm
      title="Editar Perfil"
      name={'perfil'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={disabled}
      onChange={handleFieldChange}
    >
      <input
        className="popup__item"
        type="text"
        id="profile-name"
        name="name"
        placeholder="Nombre"
        required
        value={name}
        minLength="2"
        maxLength="40"
        onChange={handleChange}
      />
      <span className="popup__item-error profile-name-error"></span>
      <input
        className="popup__item"
        type="text"
        id="about-me"
        name="about"
        placeholder="Acerca de mí"
        required
        value={description}
        minLength="2"
        maxLength="200"
        onChange={handleChange}
      />
      <span className="popup__item-error about-me-error"></span>
    </PopupWithForm>
  )
})

export default EditProfilePopup