import { memo } from 'react';

const ShowError = memo(({
  onErr: {
    errMssg,
    isErrPopupOpen: isOpen
  },
  onClose,
}) => {
  return (
    <div className={"popup" + (isOpen ? ' popup_active' : '')}>
      <div className="popup__container popup__error">
        <p className="popup__text-error">{errMssg}</p>
        <button
          onClick={onClose}
          type="button"
          className="button button__close button__close_place_form"
        />
      </div>
    </div>
  )
})

export default ShowError