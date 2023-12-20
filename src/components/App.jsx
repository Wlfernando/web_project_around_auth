import { useState, useEffect, useRef, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.jsx';
import useModal from '../customHook/useModal.js'
import Main from './Main.jsx';
import Footer from './Footer.js'
import api from '../utils/api.js';
import * as auth from '../utils/auth.js'
import Context from './Context.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const
    [isPopupOpen, openPopup, closeAllPopups] = useModal(
      'avatar',
      'edit',
      'add',
      'image',
      'remove',
      'error',
      'infoToolTip',
    ),

    [currentUser, setCurrentUser] = useState({}),
    [cards, setCards] = useState([]),

    history = useHistory(),

    cardDisplayRef = useRef({}),
    cardIdRef = useRef(''),
    mssgRef = useRef(''),

    handleError = useCallback(function (err) {
      mssgRef.current = err.message
      openPopup('error')
    }, [openPopup]);

  useEffect(() => {
    api.do('GET', api.me)
      .then(setCurrentUser)
      .catch(handleError)

    api.do('GET', api.cards)
      .then(setCards)
      .catch(handleError)
  }, [handleError])

  function handleRegister(user) {
    auth.register(user)
      .then(() => {
        mssgRef.current = '¡Correcto! Ya estás registrado.'
      })
      .catch(() => {
        mssgRef.current = `Uy, algo salió mal.
        Por favor, inténtalo de nuevo.`
      })
      .finally(() => {
        openPopup('infoToolTip')
      })
  }

  function handleLogin(user) {
    auth.login(user)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        mssgRef.current = `Uy, algo salió mal.
        Por favor, inténtalo de nuevo.`
        openPopup('infoToolTip')
      })
  }

  function openPopupCard(card) {
    if (typeof card === 'object') {
      cardDisplayRef.current = card
      openPopup('image')
    } else {
      cardIdRef.current = card
      openPopup('remove')
    }
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
      <Context
        currentUser={currentUser}
        isOpen={isPopupOpen}
        onClose={closeAllPopups}
        onMssg={mssgRef.current}
      >
        <Header />
        <Switch>
          <Route path="/signup">
            <Register
              onSubmit={handleRegister}
            />
          </Route>
          <Route path="/signin">
            <Login
              onSubmit={handleLogin}
            />
          </Route>
          <ProtectedRoute exact path="/">
            <Main
              onOpenPopup={openPopup}
              clickedCard={cardDisplayRef.current}
              cards={cards}
              openPopupCard={openPopupCard}
              onUpdate={updateContent}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </Context>
    </div>
  );
}

export default App;