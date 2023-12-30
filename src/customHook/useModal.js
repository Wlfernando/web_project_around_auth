import { useState, useCallback, useEffect, useRef } from "react";

export default function useModal(...theModals) {
  const
    settedFalse = useRef(Object.fromEntries(theModals.map(key => [key, false]))),
    [modals, setModalOpen] = useState(settedFalse.current),

    openModal = useCallback(function (modal) {
      if (!settedFalse.current[modal]) {
        throw new Error('Unknown modal\'s name')
      }

      setModalOpen((state) => ({...state, [modal]: true}))
    }, [settedFalse]),

    closeAllModals = useCallback(function () {
      setModalOpen(settedFalse.current)
    }, [settedFalse]);

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

  return [
    modals,
    openModal,
    closeAllModals,
  ]
}