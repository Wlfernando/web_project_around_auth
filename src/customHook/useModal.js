import { useState, useCallback } from "react";

export default function useModal(...theModals) {
  const
    [modals, setModalOpen] = useState(theModals.reduce(setFalse, {})),

    openModal = useCallback(function (modal) {
      setModalOpen((state) => ({...state, [modal]: true}))
    }, []),

    closeAllModals = function () {
      setModalOpen((state) => Object
        .keys(state)
        .reduce(setFalse, {})
      )
    };

  function setFalse(obj, key) {
    return Object.assign(obj, {[key]: false})
  }

  return [
    modals,
    openModal,
    closeAllModals,
  ]
}