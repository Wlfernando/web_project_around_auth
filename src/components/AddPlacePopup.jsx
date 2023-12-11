import { memo, useState, useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { PopupOpenContext } from "../contexts/PopupOpenContext";

const AddPlacePopup = memo(({
  onUpdate,
}) => {
  const
    voidForm = {
      name: {
        value: '',
        hasMessage: false,
      },
      link: {
        value: '',
        hasMessage: false,
      },
    },

    [form, setForm] = useState(voidForm),
    [disabled, setDisabled] = useState(true),

    nameRef = useRef(null),
    linkRef = useRef(null),

    { add } = useContext(PopupOpenContext),

    {name, link} = form;

  function handleChange(e) {
    const
      input = e.target,
      aName = input.name;

    form[aName].hasMessage = true
    form[aName].value = input.value

    setForm(JSON.parse(JSON.stringify(form)))
  }

  function handleSubmit(setBtn) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        setBtn()
        setForm(voidForm)
        setDisabled(true)
      }, delayTimer)
    }

    onUpdate(setDelay)
      .handleAddSubmit({
        name: form.name.value,
        link: form.link.value,
      })
  }

  return(
    <PopupWithForm
      title="Nuevo Lugar"
      name='site'
      btnText='Crear'
      isOpen={add}
      onSubmit={handleSubmit}
      isDisabled={disabled}
      setDisabled={setDisabled}
    >
      <input
        className="form__item"
        type="text"
        name="name"
        required
        placeholder="Título"
        minLength="2"
        maxLength="30"
        value={name.value}
        onChange={handleChange}
        ref={nameRef}
      />
      <span className="form__item-error">
        {name.hasMessage && nameRef.current.validationMessage}
      </span>
      <input
        className="form__item"
        type="url"
        name="link"
        required
        placeholder="Enlace de la imagen"
        value={link.value}
        onChange={handleChange}
        ref={linkRef}
      />
      <span className="form__item-error">
        {link.hasMessage && linkRef.current.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default AddPlacePopup