import React from "react";

const ImagePopup = React.memo(({
  isOpen,
  clickedCard: {
    name,
    link,
  },
  onClose,
}) => {
  return(
    <div className={'popup' + (isOpen ? ' popup_active' : '')}>
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