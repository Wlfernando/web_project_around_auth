import React from 'react';
import ImagePopup from './ImagePopup.jsx';
import Card from './Card.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.jsx';
import Profile from './Profile.jsx';
import DeletePopup from './DeletePopup.jsx';
import ShowError from './ShowError.jsx'

const Main = React.memo(({
  isOpen: {
    avatar,
    edit,
    add,
    image,
    remove,
    error,
  },
  onOpenPopup,
  clickedCard,
  cards,
  errMssg,
  onCardClick,
  onWillDelete,
  onClose,
  onUpdateUser,
  onUpdateAvatar,
  onCardLike,
  onCardDelete,
  onCardSubmit,
}) => {
  function handleValidation(e, setDisabled) {
    const
      field = e.currentTarget.elements,
      hasValid = Array(...field).every(input=>
        input.validity.valid
      )

    setDisabled(hasValid ? false : true)
  }

  return(
    <main className="content">
      <Profile
        onOpen={onOpenPopup}
      />
      <ul className="cards">
        {cards.map(card=>
          <Card
            key={card._id}
            data={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDelete={onWillDelete}
          />
        )}
      </ul>
      <ImagePopup
        isOpen={image}
        clickedCard={clickedCard}
        onClose={onClose}
      />
      <EditProfilePopup
        isOpen={edit}
        onClose={onClose}
        onUpdateUser={onUpdateUser}
        onFieldChge={handleValidation}
      />
      <AddPlacePopup
        isOpen={add}
        onClose={onClose}
        onCardSubmit={onCardSubmit}
        onFieldChge={handleValidation}
      />
      <DeletePopup
        isOpen={remove}
        onDelete={onCardDelete}
        onClose={onClose}
      />
      <EditAvatarPopup
        isOpen={avatar}
        onClose={onClose}
        onUpdateAvatar={onUpdateAvatar}
        onFieldChge={handleValidation}
      />
      <ShowError
        isOpen={error}
        errMssg={errMssg}
        onClose={onClose}
      />
    </main>
  )
})

export default Main