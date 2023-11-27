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
  onOpenPopup,
  clickedCard,
  cards,
  errMssg,
  onCardClick,
  onUpdate,
}) => {
  return(
    <main className="content">
      <Profile onOpen={onOpenPopup} />
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
      <ImagePopup clickedCard={clickedCard} />
      <EditProfilePopup onUpdate={onUpdate} />
      <AddPlacePopup onUpdate={onUpdate} />
      <DeletePopup onUpdate={onUpdate} />
      <EditAvatarPopup onUpdate={onUpdate} />
      <ShowError errMssg={errMssg} />
    </main>
  )
})

export default Main