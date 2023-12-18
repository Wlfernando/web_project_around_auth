import { memo, useContext } from 'react';
import { PopupOpenContext } from '../contexts/PopupOpenContext';
import { CloseContext } from '../contexts/CloseContext';
import { MssgContext } from '../contexts/MssgContext';

const ShowError = memo(() => {
  const
    { error } = useContext(PopupOpenContext),
    handleClose = useContext(CloseContext),
    mssg = useContext(MssgContext);

  return (
    <div className={"popup" + (error ? ' popup_active' : '')}>
      <div className="popup__wrapper">
        <p className="popup__mssg">{mssg}</p>
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