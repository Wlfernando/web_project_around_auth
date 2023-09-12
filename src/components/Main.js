import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

const Main = React.memo((props)=> {
  const
    {isEditProfilePopupOpen, handleEditProfileClick} = props.onEditProfileClick,
    {isAddPlacePopupOpen, handleAddPlaceClick} = props.onAddPlaceClick,
    {isEditAvatarPopupOpen, handleEditAvatarClick} = props.onEditAvatarClick,
    handleCardClick = props.onCardClick.handleCardClick,
    {onUpdateUser, onClose, onUpdateAvatar, cards, onCardLike, onCardDelete, onCardSubmit} = props,

    {name, about, avatar} = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{backgroundImage: 'url(' + avatar + ')'}}>
          <div onClick={handleEditAvatarClick} className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <p className="profile__user-name">{name}</p>
          <button onClick={handleEditProfileClick} className="button profile__edit-button"></button>
          <p className="profile__about-me">{about}</p>
        </div>
        <button onClick={handleAddPlaceClick} className="button profile__add-button"></button>
      </section>
      <ul className="cards">
        {cards.map(card=>
          <Card
            key={card._id}
            data={card}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            onDelete={onCardDelete}
          />
        )}
      </ul>
      <ImagePopup
        onOpen={props.onCardClick}
        onClose={onClose}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={onClose}
        onUpdateUser={onUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={onClose}
        onCardSubmit={onCardSubmit}
      />
      <PopupWithForm
        title='¿Estás seguro/a?'
        name={'delete'}
        btn='Si'
        isOpen={false}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={onClose}
        onUpdateAvatar={onUpdateAvatar}
      />
      <div className="popup">
        <div className="popup__container popup__error">
          <p className="popup__text-error"></p>
          <button
            type="button"
            className="button button__close button__close_place_form"
          ></button>
        </div>
      </div>
    </main>
  )
})

export default Main