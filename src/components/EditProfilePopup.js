import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

const EditProfilePopup = React.memo(({isOpen, onClose, onUpdateUser})=> {
  const
    [name, setName] = React.useState(''),
    [description, setDescription] = React.useState(''),
    [disabled, setDisabled] = React.useState(true),

    nameRef = React.useRef(null),
    aboutRef= React.useRef(null),

    {name: nameFromApi, about} = React.useContext(CurrentUserContext),

    errMessage = disabled && 'popup__item-error_active'

  React.useEffect(()=> {
    setName(nameFromApi ?? '')
    setDescription(about ?? '')
  }, [nameFromApi, about])

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
        ref={nameRef}
      />
      <span className={"popup__item-error profile-name-error " + errMessage}>
        {nameRef.current?.validationMessage}
      </span>
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
      <span className={"popup__item-error about-me-error " + errMessage}>
        {aboutRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default EditProfilePopup