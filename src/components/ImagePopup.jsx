import { useContext, memo } from "react";
import { PopupOpenContext } from "../contexts/PopupOpenContext";
import { CloseContext } from "../contexts/CloseContext";

const ImagePopup = memo(({
  clickedCard: {
    name,
    link,
  },
}) => {
  const
    { image } = useContext(PopupOpenContext),
    handleClose = useContext(CloseContext);

  return(
    <div className={'popup' + (image ? ' popup_active' : '')}>
      <figure className="popup__image-container">
        <img className="popup__image" src={link} alt={name} />
        <figcaption className="popup__title-image">{name}</figcaption>
        <button
          type="button"
          className="button button__close button__close_place_image"
          onClick={handleClose}
        ></button>
      </figure>
    </div>
  )
})

export default ImagePopup