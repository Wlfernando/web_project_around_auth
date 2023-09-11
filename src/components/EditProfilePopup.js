import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

const EditProfilePopup = React.memo(({isOpen, onClose, onUpdateUser})=> {
  const [name, setName] = React.useState(''),
  [description, setDescription] = React.useState(''),

  {name: nameFromApi, about} = React.useContext(CurrentUserContext)

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
  }

  React.useEffect(()=> {
    setName(nameFromApi)
    setDescription(about)
  }, [nameFromApi, about])

  return (
    <PopupWithForm
      title="Editar Perfil"
      name={'perfil'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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