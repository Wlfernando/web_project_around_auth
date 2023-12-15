import { memo, useState, useRef, useContext, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { PopupOpenContext } from "../contexts/PopupOpenContext";

const EditProfilePopup = memo(({
  onUpdate,
}) => {
  const
    [name, setName] = useState(''),
    [description, setDescription] = useState(''),

    nameRef = useRef(null),
    aboutRef= useRef(null),

    {name: nameFromApi, about} = useContext(CurrentUserContext),
    { edit } = useContext(PopupOpenContext);

  useEffect(()=> {
    setName(nameFromApi ?? '')
    setDescription(about ?? '')
  }, [nameFromApi, about])

  function handleChange(e) {
    const input = e.target

    switch (input.name) {
      case 'name':
        setName(input.value)
        break
      case 'about':
        setDescription(input.value)
        break
      default:
        console.error('Invalid input')
    }
  }

  function handleSubmit(setBtn) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        setBtn()
      }, delayTimer)
    }

    onUpdate(setDelay).handleUser({name, about: description})
  }

  return (
    <PopupWithForm
      title="Editar Perfil"
      name='perfil'
      isOpen={edit}
      onSubmit={handleSubmit}
    >
      <input
        className="form__item"
        type="text"
        id="profile-name"
        name="name"
        placeholder="Nombre"
        required
        value={name}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        ref={nameRef}
      />
      <span className="form__item-error">
        {nameRef.current?.value && nameRef.current.validationMessage}
      </span>
      <input
        className="form__item"
        type="text"
        id="about-me"
        name="about"
        placeholder="Acerca de mí"
        required
        value={description}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        ref={aboutRef}
      />
      <span className="form__item-error">
        {aboutRef.current?.value && aboutRef.current.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default EditProfilePopup