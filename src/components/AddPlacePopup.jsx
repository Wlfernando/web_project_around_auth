import { memo, useState, useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { PopupOpenContext } from "../contexts/PopupOpenContext";

const AddPlacePopup = memo(({
  onUpdate,
  onValidation,
}) => {
  const
    voidForm = {name: '', link: ''},

    [form, setForm] = useState(voidForm),
    [disabled, setDisabled] = useState(true),

    nameRef = useRef(null),
    linkRef = useRef(null),

    { add } = useContext(PopupOpenContext),

    {name, link} = form;

  function handleChange(e) {
    const input = e.target;

    setForm({...form, [input.name]: input.value})
  }

  function handleValidation(e) {
    onValidation(e, setDisabled)
  }

  function handleSubmit(setBtn) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        setBtn()
        setForm(voidForm)
        setDisabled(true)
      }, delayTimer)
    }

    onUpdate(setDelay).handleAddSubmit(form)
  }

  return(
    <PopupWithForm
      title="Nuevo Lugar"
      name='site'
      textBtn='Crear'
      isOpen={add}
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
        {nameRef.current?.value && nameRef.current.validationMessage}
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
        {linkRef.current?.value && linkRef.current.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default AddPlacePopup