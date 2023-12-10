import { useState, useCallback, useEffect } from "react";

export default function useModal(...theModals) {
  const
    [modals, setModalOpen] = useState(theModals.reduce(setFalse, {})),

    openModal = useCallback(function (modal) {
      setModalOpen((state) => ({...state, [modal]: true}))
    }, []),

    closeAllModals = useCallback(function () {
      setModalOpen((state) => Object
        .keys(state)
        .reduce(setFalse, {})
      )
    }, []);

  useEffect(() => {
    const hasOpened = Object
      .values(modals)
      .some(Boolean);

    function handleListenerClose(e) {
      const
        hasClicked = ['popup_active', 'popup__image-container']
          .some(click => e.target.classList.contains(click)),
        escPressed = e.key === 'Escape';

      if(hasClicked || escPressed) closeAllModals()
    }

    if(hasOpened) {
      document.addEventListener('click', handleListenerClose)
      document.addEventListener('keydown', handleListenerClose)
    }

    return ()=> {
      document.removeEventListener('keydown', handleListenerClose)
      document.removeEventListener('click', handleListenerClose)
    }
  }, [modals, closeAllModals])

  function setFalse(obj, key) {
    return Object.assign(obj, {[key]: false})
  }

  return [
    modals,
    openModal,
    closeAllModals,
  ]
}