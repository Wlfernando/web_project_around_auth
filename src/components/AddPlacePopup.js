import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = React.memo(({
  isOpen,
  onClose,
  onCardSubmit,
  onFieldChge
})=> {
  const
    [name, setName] = React.useState(''),
    [link, setLink] = React.useState(''),
    [disabled, setDisabled] = React.useState(true),

    nameRef = React.useRef(null),
    linkRef = React.useRef(null),

    errMessage = disabled && 'popup__item-error_active'

    function handleValidation(e) {
      onFieldChge(e, setDisabled)
    }

  function handleChange(e) {
    const input = e.target
    return {
      name() {setName(input.value)},
      link() {setLink(input.value)}
    }[input.name]()
  }

  function handleSubmit(e) {
    e.preventDefault()
    onCardSubmit({name, link})
    setTimeout(()=> {
      setName('')
      setLink('')
      setDisabled(true)
    }, 1250)
  }

  return(
    <PopupWithForm
      title="Nuevo Lugar"
      name={'site'}
      btn='Crear'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={disabled}
      onChange={handleValidation}
    >
      <input
        className="popup__item"
        type="text"
        id="image-name"
        name="name"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChange}
        ref={nameRef}
      />
      <span className={"popup__item-error image-name-error " + errMessage}>
        {nameRef.current?.validationMessage}
      </span>
      <input
        className="popup__item"
        type="url"
        id="image-src"
        name="link"
        required
        placeholder="Enlace de la imagen"
        value={link}
        onChange={handleChange}
        ref={linkRef}
      />
      <span className={"popup__item-error image-src-error " + errMessage}>
        {linkRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default AddPlacePopup