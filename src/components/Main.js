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
  [cards, setCards] = React.useState([]),
  {isEditProfilePopupOpen, handleEditProfileClick} = props.onEditProfileClick,
  {isAddPlacePopupOpen, handleAddPlaceClick} = props.onAddPlaceClick,
  {isEditAvatarPopupOpen, handleEditAvatarClick} = props.onEditAvatarClick,
  handleCardClick = props.onCardClick.handleCardClick;

  React.useEffect(()=> {
    api.do('GET', api.me)
      .then(userData=> {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        setUserID(userData._id)
      })
      .catch(err=> console.log(err))
  }, [])

  React.useEffect(()=> {
    api.do('GET', api.cards)
      .then(cards=> setCards(cards))
      .catch(err=> console.log(err))
  }, [])

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{backgroundImage: 'url(' + userAvatar + ')'}}>
          <div onClick={handleEditAvatarClick} className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <p className="profile__user-name">{userName}</p>
          <button onClick={handleEditProfileClick} className="button profile__edit-button"></button>
          <p className="profile__about-me">{userDescription}</p>
        </div>
        <button onClick={handleAddPlaceClick} className="button profile__add-button"></button>
      </section>
      <ul className="cards">
        {cards.map(card=> <Card key={card._id} data={card} userID={userID} onCardClick={handleCardClick}/>)}
      </ul>
      <ImagePopup onOpen={props.onCardClick} onClose={props.onClose} />
      <PopupWithForm title="Editar Perfil" name={'perfil'} isOpen={isEditProfilePopupOpen} onClose={props.onClose}>
        <input
          className="popup__item"
          type="text"
          id="profile-name"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__item-error profile-name-error"></span>
        <input
          className="popup__item"
          type="text"
          id="about-me"
          name="about"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__item-error about-me-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Nuevo Lugar" name={'site'} btn='Crear' isOpen={isAddPlacePopupOpen} onClose={props.onClose}>
        <input
          className="popup__item"
          type="text"
          id="image-name"
          name="name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__item-error image-name-error"></span>
        <input
          className="popup__item"
          type="url"
          id="image-src"
          name="link"
          required
          placeholder="Enlace de la imagen"
        />
        <span className="popup__item-error image-src-error"></span>
      </PopupWithForm>
      <PopupWithForm title='¿Estás seguro/a?' name={'delete'} btn='Si' isOpen={false} />
      <PopupWithForm title='Cambiar foto de Perfil' name={'avatar'} isOpen={isEditAvatarPopupOpen} onClose={props.onClose}>
        <input
          className="popup__item"
          type="url"
          id="avatar"
          name="avatar"
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