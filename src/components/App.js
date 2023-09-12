import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';


function App() {
  const
    [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false),
    [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false),
    [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false),
    [isImageOpen, setImageOpen] = React.useState(false),
    [selectedCard, setSelectedCard] = React.useState({}),
    [currentUser, setCurrentUser] = React.useState({}),
    [cards, setCards] = React.useState([]),
    ID = currentUser._id;

  React.useEffect(()=> {
    api.do('GET', api.me)
      .then(userData=> {
        setCurrentUser(userData)
      })
      .catch(err=> console.log(err))

    api.do('GET', api.cards)
      .then(apiCards=> setCards(apiCards))
      .catch(err=> console.log(err))
  }, [])

  React.useEffect(()=> {
    function handleListenerClose(e) {
      if(['popup_active', 'popup__image-container'].some(click=>
        e.target.classList.contains(click))
      || e.key === 'Escape')
        closeAllPopups()
    }

    if([
      isEditProfilePopupOpen,
      isEditAvatarPopupOpen,
      isAddPlacePopupOpen,
      isImageOpen
      ].some(change=> change === true)) {
      document.addEventListener('click', handleListenerClose)
      document.addEventListener('keydown', handleListenerClose)
    }

    return ()=> {
      document.removeEventListener('keydown', handleListenerClose)
      document.removeEventListener('click', handleListenerClose)
    }
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isImageOpen,
  ])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImageOpen(true)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImageOpen(false)
  }

  function handleUpdateUser(form) {
    api.send('PATCH', api.me, form)
      .then(userData=> {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err=> console.log(err))
  }

  function handleUpdateAvatar(form) {
    api.send('PATCH', api.avatar, form, api.me)
      .then(userData=> {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err=> console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like=> like._id === ID),
    setLike = isLiked ? 'DELETE' : 'PUT';

    api.do(setLike, api.likes, card._id)
      .then(()=> {
        api.do('GET', api.cards)
          .then(newCard=>
            setCards(state=>
              state.map((c, idx)=>
                c._id === card._id
                  ? newCard.at(idx)
                  : c
              )
            )
          )
      })
  }

  function handleCardDelete(card) {
    api.do('DELETE', api.cards, card._id)
      .then(()=>
        setCards(state=>
          state.filter(c=> c._id !== card._id)
        )
      )
  }

  function handleAddPlaceSubmit(form) {
    api.send('POST', api.cards, form)
      .then(apiCards=> {
        setCards([apiCards.at(0), ...cards])
        closeAllPopups()
      })
      .catch(err=> console.log(err))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfileClick={
            {isEditProfilePopupOpen, handleEditProfileClick}
          }
          onAddPlaceClick={
            {isAddPlacePopupOpen, handleAddPlaceClick}
          }
          onEditAvatarClick={
            {isEditAvatarPopupOpen, handleEditAvatarClick}
          }
          onCardClick={
            {selectedCard, isImageOpen, handleCardClick}
          }
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onUpdateAvatar={handleUpdateAvatar}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;