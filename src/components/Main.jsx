import React from 'react';
import ImagePopup from './ImagePopup.jsx';
import Card from './Card.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
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
  onClose,
  onUpdate,
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
            onUpdate={onUpdate}
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
        onUpdate={onUpdate}
        onFieldChge={handleValidation}
      />
      <AddPlacePopup
        isOpen={add}
        onClose={onClose}
        onUpdate={onUpdate}
        onFieldChge={handleValidation}
      />
      <DeletePopup
        isOpen={remove}
        onUpdate={onUpdate}
        onClose={onClose}
      />
      <EditAvatarPopup
        isOpen={avatar}
        onClose={onClose}
        onUpdate={onUpdate}
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