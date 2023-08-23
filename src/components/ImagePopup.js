export default function ImagePopup() {
  return(
    <div className="popup">
      <figure className="popup__image-container">
        <img className="popup__image" src=" " alt=" " />
        <figcaption className="popup__title-image"></figcaption>
        <button
          type="button"
          className="button button__close button__close_place_image"
        ></button>
      </figure>
    </div>
  )
}