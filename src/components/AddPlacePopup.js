import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = React.memo(({isOpen, onClose, onCardSubmit})=> {
  const
    [name, setName] = React.useState(''),
    [link, setLink] = React.useState(''),
    [disabled, setDisabled] = React.useState(true)

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
      onChange={handleFieldChange}
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
      />
      <span className="popup__item-error image-name-error"></span>
      <input
        className="popup__item"
        type="url"
        id="image-src"
        name="link"
        required
        placeholder="Enlace de la imagen"
        value={link}
        onChange={handleChange}
      />
      <span className="popup__item-error image-src-error"></span>
    </PopupWithForm>
  )
})

export default AddPlacePopup