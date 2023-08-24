import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js'
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false),
  [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false),
  [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false),
  [selectedCard, setSelectedCard] = React.useState({});

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
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="page">
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
          {selectedCard, handleCardClick}
        }
        onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;
