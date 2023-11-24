import { memo, useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = memo(({
  isOpen,
  onClose,
  onUpdate,
  onValidation,
}) => {
  const
    voidForm = {name: '', link: ''},

    [form, setForm] = useState(voidForm),
    [disabled, setDisabled] = useState(true),

    nameRef = useRef(null),
    linkRef = useRef(null),

    {name, link} = form;

  function handleChange(e) {
    const input = e.target;

    setForm({...form, [input.name]: input.value})
    onValidation(e, setDisabled)
  }

  function handleSubmit(setText) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        setText()
        setForm(voidForm)
        setDisabled(true)
      }, delayTimer)
    }

    onUpdate(setDelay).handleAddSubmit(form)
  }

  return(
    <PopupWithForm
      title="Nuevo Lugar"
      name={'site'}
      textBtn='Crear'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={disabled}
      onChange={handleChange}
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
        ref={nameRef}
      />
      <span className="popup__item-error">
        {nameRef.current?.value && nameRef.current.validationMessage}
      </span>
      <input
        className="popup__item"
        type="url"
        name="link"
        required
        placeholder="Enlace de la imagen"
        value={link}
        ref={linkRef}
      />
      <span className="popup__item-error">
        {linkRef.current?.value && linkRef.current.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default AddPlacePopup