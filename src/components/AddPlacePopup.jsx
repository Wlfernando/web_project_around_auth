import { memo, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { PopupOpenContext } from "../contexts/PopupOpenContext";
import useForm from "../customHook/useForm";

const AddPlacePopup = memo(({
  onUpdate,
}) => {
  const
    formName = 'site',
    
    [inputs, handleChange, resetForm] = useForm(formName),

    { add } = useContext(PopupOpenContext);

  function handleSubmit(setBtn) {
    function setDelay(delayTimer) {
      setTimeout(() => {
        setBtn()
        resetForm()
      }, delayTimer)
    }

    onUpdate(setDelay)
      .handleAddSubmit({
        name: inputs.name.value,
        link: inputs.link.value,
      })
  }

  return(
    <PopupWithForm
      title="Nuevo Lugar"
      name={formName}
      btnText='Crear'
      isOpen={add}
      onSubmit={handleSubmit}
    >
      <input
        className="form__item"
        type="text"
        name="name"
        required
        placeholder="Título"
        minLength="2"
        maxLength="30"
        value={inputs?.name.value ?? ''}
        onChange={handleChange}
      />
      <span className="form__item-error">
        {inputs?.name.haveMssg && inputs.name.validationMessage}
      </span>
      <input
        className="form__item"
        type="url"
        name="link"
        required
        placeholder="Enlace de la imagen"
        value={inputs?.link.value ?? ''}
        onChange={handleChange}
      />
      <span className="form__item-error">
        {inputs?.link.haveMssg && inputs.link.validationMessage}
      </span>
    </PopupWithForm>
  )
})

export default AddPlacePopup