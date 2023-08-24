import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

export default function Main(props) {
  const [userName, setUserName] = React.useState('Jack Costeau'),
  [userDescription, setUserDescription] = React.useState('Explorador'),
  [userAvatar, setUserAvatar] = React.useState(''),
  [userID, setUserID] = React.useState(''),
  [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    api.do('GET', api.me)
      .then(userData=> {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        setUserID(userData._id)
      })
  }, [])

  React.useEffect(()=> {
    api.do('GET', api.cards)
      .then(cards=> {
        setCards(cards)
      })
  }, [])

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{backgroundImage: 'url(' + userAvatar + ')'}}>
          <div onClick={props.onEditAvatarClick.handleEditAvatarClick} className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <p className="profile__user-name">{userName}</p>
          <button onClick={props.onEditProfileClick.handleEditProfileClick} className="button profile__edit-button"></button>
          <p className="profile__about-me">{userDescription}</p>
        </div>
        <button onClick={props.onAddPlaceClick.handleAddPlaceClick} className="button profile__add-button"></button>
      </section>
      <ul className="cards">
        {cards.map(card=> <Card data={card} userID={userID} onCardClick={props.onCardClick.handleCardClick}/>)}
      </ul>
      <ImagePopup card={props.onCardClick.selectedCard} onClose={props.onClose} />
      <PopupWithForm title="Editar Perfil" isOpen={props.onEditProfileClick.isEditProfilePopupOpen} onClose={props.onClose}>
        <input
          className="popup__item"
          type="text"
          id="profile-name"
          name="name"
          value={userName}
          placeholder="Nombre"
          required
          minlength="2"
          maxlength="40"
        />
        <span className="popup__item-error profile-name-error"></span>
        <input
          className="popup__item"
          type="text"
          id="about-me"
          name="about"
          value={userDescription}
          placeholder="Acerca de mí"
          required
          minlength="2"
          maxlength="200"
        />
        <span className="popup__item-error about-me-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Nuevo Lugar" btn='Crear' isOpen={props.onAddPlaceClick.isAddPlacePopupOpen} onClose={props.onClose}>
        <input
          className="popup__item"
          type="text"
          id="image-name"
          name="name"
          value=""
          placeholder="Título"
          minlength="2"
          maxlength="30"
        />
        <span className="popup__item-error image-name-error"></span>
        <input
          className="popup__item"
          type="url"
          id="image-src"
          name="link"
          required
          value=""
          placeholder="Enlace de la imagen"
        />
        <span className="popup__item-error image-src-error"></span>
      </PopupWithForm>
      <PopupWithForm title='¿Estás seguro/a?' btn='Si' isOpen={false} />
      <PopupWithForm title='Cambiar foto de Perfil' isOpen={props.onEditAvatarClick.isEditAvatarPopupOpen} onClose={props.onClose}>
        <input
          className="popup__item"
          type="url"
          id="avatar"
          name="avatar"
          value=""
          required
          placeholder="Enlace del avatar"
        />
        <span className="popup__item-error avatar-error"></span>
      </PopupWithForm>
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
}