import { memo, useContext } from 'react';
import { PopupOpenContext } from '../contexts/PopupOpenContext';
import { CloseContext } from '../contexts/CloseContext';

const ShowError = memo(({
  errMssg,
}) => {
  const
    { error } = useContext(PopupOpenContext),
    handleClose = useContext(CloseContext);

  return (
    <div className={"popup" + (error ? ' popup_active' : '')}>
      <div className="popup__wrapper">
        <p className="popup__mssg">{errMssg}</p>
        <button
          onClick={handleClose}
          type="button"
          className="button button__close button__close_place_form"
        />
      </div>
    </div>
  )
})

export default ShowError