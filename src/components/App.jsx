import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Header.js';
import Main from './Main.jsx';
import Footer from './Footer.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';

function App() {
  const
    [isPopupOpen, setPopupOpen] = useState({
      avatar: false,
      edit: false,
      add: false,
      image: false,
      remove: false,
      error: false,
    }),
    [currentUser, setCurrentUser] = useState({}),
    [cards, setCards] = useState([]),

    cardDisplayRef = useRef({}),
    cardIdRef = useRef(''),
    errRef = useRef(''),

    handleError = useCallback(function (err) {
      errRef.current = err.message
      openPopup('error')
    }, []);

  useEffect(() => {
    api.do('GET', api.me)
      .then(setCurrentUser)
      .catch(handleError)

    api.do('GET', api.cards)
      .then(setCards)
      .catch(handleError)
  }, [handleError])

  useEffect(() => {
    const hasOpened = Object
      .values(isPopupOpen)
      .some(Boolean);

    function handleListenerClose(e) {
      const
        hasClicked = ['popup_active', 'popup__image-container']
          .some(click => e.target.classList.contains(click)),
        escPressed = e.key === 'Escape';

      if(hasClicked || escPressed) closeAllPopups()
    }

    if(hasOpened) {
      document.addEventListener('click', handleListenerClose)
      document.addEventListener('keydown', handleListenerClose)
    }

    return ()=> {
      document.removeEventListener('keydown', handleListenerClose)
      document.removeEventListener('click', handleListenerClose)
    }
  }, [isPopupOpen])

  function openPopup(popup) {
    setPopupOpen((state) => ({...state, [popup]: true}))
  }

  function closeAllPopups() {
    setPopupOpen((state) => Object
      .keys(state)
      .reduce((obj, key) => ({...obj, [key]: false}), {})
    )
  }

  function openPopupCard(card, popup) {
    typeof card === 'object'
      ? cardDisplayRef.current = card
      : cardIdRef.current = card

    openPopup(popup)
  }

  function updateContent(setDelay) {
    function setFinally() {
      closeAllPopups()
      setDelay(250)
    }

    function handleAvatar(form) {
      api.send('PATCH', api.avatar, form, api.me)
        .then(setCurrentUser)
        .catch(handleError)
        .finally(setFinally)
    }

    function handleUser(form) {
      api.send('PATCH', api.me, form)
        .then(setCurrentUser)
        .catch(handleError)
        .finally(setFinally)
    }

    function handleAddSubmit(form) {
      api.send('POST', api.cards, form)
        .then(setCards)
        .catch(handleError)
        .finally(setFinally)
    }

    async function handleLike(isLiked, cardId) {
      const
        index = Promise
          .resolve()
          .then(() => cards.findIndex(getTheCard)),
        aCard = api.do(isLiked ? 'DELETE' : 'PUT', api.likes, cardId)
          .then(() => api.do('GET', api.cards))
          .then(cardsFromApi => cardsFromApi.find(getTheCard)),
        updatedCards = await Promise
          .all([index, aCard])
          .then(theCard => cards.with(...theCard))
          .catch(handleError);

      function getTheCard({ _id }) {
        return _id === cardId
      }

      setCards(updatedCards)
    }

    function handleDelete() {
      const theId = cardIdRef.current;

      api.do('DELETE', api.cards, theId)
        .then(() =>
          setCards(state => {
            const deletedCard = state
              .findIndex(({ _id }) => _id === theId);

            return state
              .slice(0, deletedCard)
              .concat(state.slice(deletedCard + 1));
          })
        )
        .catch(handleError)
        .finally(setFinally)
    }

    return {
      handleAvatar,
      handleUser,
      handleAddSubmit,
      handleLike,
      handleDelete,
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          isOpen={isPopupOpen}
          onOpenPopup={openPopup}
          clickedCard={cardDisplayRef.current}
          cards={cards}
          errMssg={errRef.current}
          onCardClick={openPopupCard}
          onUpdate={updateContent}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;