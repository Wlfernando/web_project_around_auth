import { useContext } from "react"
import { PopupOpenContext } from "../contexts/PopupOpenContext"
import { CloseContext } from "../contexts/CloseContext"
import affirmative from '../images/Tooltip/UnionA.svg'
import negative from '../images/Tooltip/UnionN.svg'

export default function InfoToolTip({
  onRef,
}) {
  const
    { infoToolTip } = useContext(PopupOpenContext),
    handleClose = useContext(CloseContext),

    icon = onRef.includes('¡Correcto!')
      ? affirmative
      : negative;

  return (
    <div className={"popup" + (infoToolTip ? ' popup_active' : '')}>
      <div className="popup__wrapper">
        <img className="popup__icon" src={icon} alt='' />
        <p className="popup__mssg">{onRef}</p>
        <button
          onClick={handleClose}
          type="button"
          className="button button__close button__close_place_form"
        />
      </div>
    </div>
  )
}