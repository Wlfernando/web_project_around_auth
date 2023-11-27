import { useContext, memo } from "react";
import { PopupOpenContext } from "../contexts/PopupOpenContext";

const ImagePopup = memo(({
  clickedCard: {
    name,
    link,
  },
  onClose,
}) => {
  const { image } = useContext(PopupOpenContext)

  return(
    <div className={'popup' + (image ? ' popup_active' : '')}>
      <figure className="popup__image-container">
        <img className="popup__image" src={link} alt={name} />
        <figcaption className="popup__title-image">{name}</figcaption>
        <button
          type="button"
          className="button button__close button__close_place_image"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  )
})

export default ImagePopup