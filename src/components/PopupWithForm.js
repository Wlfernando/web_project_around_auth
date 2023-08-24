export default function PopupWithForm(props) {
  return (
    <div className={'popup ' + (props.isOpen && 'popup_active')}>
      <form
        className="popup__container profile-form"
        name="profileForm"
        noValidate
      >
        <fieldset className="popup__content">
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button
            type="submit"
            className="button button__submit"
            name="saveBtn"
          >
            {props.btn ?? 'Guardar'}
            <div className="button__submit_processing">Guardando...</div>
          </button>
        </fieldset>
        <button
          type="button"
          className="button button__close button__close_place_form"
          onClick={props.onClose}
        ></button>
      </form>
    </div>
  )
}