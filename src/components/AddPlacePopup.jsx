import { memo, useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = memo(({
  isOpen,
  onClose,
  onCardSubmit,
  onFieldChge,
}) => {
  const
    voidForm = {name: '', link: ''},

    [form, setForm] = useState(voidForm),
    [disabled, setDisabled] = useState(true),

    nameRef = useRef(null),
    linkRef = useRef(null),

    {name, link} = form;

  function handleValidation(e) {
    onFieldChge(e, setDisabled)
  }

  function handleChange(e) {
    const input = e.target

    setForm({...form, [input.name]: input.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    onCardSubmit(form)
    setTimeout(()=> {
      setForm(voidForm)
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
        name="name"
        required
        placeholder="Título"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChange}
        ref={nameRef}
      />
      <span className="popup__item-error">
        {nameRef.current?.value && nameRef.current?.validationMessage}
      </span>
      <input
        className="popup__item"
        type="url"
        name="link"
        required
        placeholder="Enlace de la imagen"
        value={link}
        onChange={handleChange}
        ref={linkRef}
      />
      <span className="popup__item-error">
        {linkRef.current?.value && linkRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default AddPlacePopup