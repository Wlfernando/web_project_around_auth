import { useState, useEffect, useRef, useCallback } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { routeDev } from '../contexts/RouteContext.js';
import { aroundNomoreparties } from '../utils/api.js';
import Header from './Header.jsx';
import useModal from '../customHook/useModal.js'
import Main from './Main.jsx';
import Footer from './Footer.jsx'
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
    { pathname } = useLocation(),

    cardDisplayRef = useRef({}),
    cardIdRef = useRef(''),
    mssgRef = useRef(''),

    handleError = useCallback(function (err) {
      mssgRef.current = err.message
      openPopup('error')
    }, [openPopup]),
    
    { main, register, login} = routeDev;

  useEffect(() => {
    if ([register, login].every(route => route !== pathname)) {
      const {me, cards, get} = aroundNomoreparties;
    
      get(me)
        .then(setCurrentUser)
        .catch(handleError)

      get(cards)
        .then(setCards)
        .catch(handleError)
    }
  }, [pathname, login, register, handleError])

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
        history.push(main)
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
    const 
      {me, avatar, cards: cardsRoute, likes } = aroundNomoreparties,
      {patch, post, toggle, get, remove} = aroundNomoreparties;

    function setFinally() {
      closeAllPopups()
      setDelay(250)
    }

    function handleAvatar(form) {
      patch(avatar, form, me)
        .then(setCurrentUser)
        .catch(handleError)
        .finally(setFinally)
    }

    function handleUser(form) {
      patch(me, form)
        .then(setCurrentUser)
        .catch(handleError)
        .finally(setFinally)
    }

    function handleAddSubmit(form) {
      post(cardsRoute, form)
        .then(setCards)
        .catch(handleError)
        .finally(setFinally)
    }

    async function handleLike(isLiked, cardId) {
      const
        getTheCard = ({ _id }) => _id === cardId,

        index = Promise
          .resolve()
          .then(() => cards.findIndex(getTheCard)),
        aCard = toggle(isLiked, likes, cardId)
          .then(() => get(cardsRoute))
          .then(cardsFromApi => cardsFromApi.find(getTheCard)),
        updatedLike = await Promise
          .all([index, aCard])
          .then(theCard => cards.with(...theCard))
          .catch(handleError);

      setCards(updatedLike)
    }

    function handleDelete() {
      const theId = cardIdRef.current;

      remove(cardsRoute, theId)
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
          <Route path={register}>
            <Register
              onSubmit={handleRegister}
            />
          </Route>
          <Route path={login}>
            <Login
              onSubmit={handleLogin}
            />
          </Route>
          <ProtectedRoute exact path={main}>
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