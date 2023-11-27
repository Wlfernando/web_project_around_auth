import { memo, useContext } from 'react';
import { PopupOpenContext } from '../contexts/PopupOpenContext';

const ShowError = memo(({
  errMssg,
  onClose,
}) => {
  const { error } = useContext(PopupOpenContext);

  return (
    <div className={"popup" + (error ? ' popup_active' : '')}>
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