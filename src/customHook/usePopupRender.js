import { useState, useCallback } from "react";

export default function usePopupRender(...popups) {
  const
    [isPopupOpen, setPopupOpen] = useState(popups.reduce(setFalse, {})),

    openPopup = useCallback(function (popup) {
      setPopupOpen((state) => ({...state, [popup]: true}))
    }, []),

    closeAllPopups = function () {
      setPopupOpen((state) => Object
        .keys(state)
        .reduce(setFalse, {})
      )
    };

  function setFalse(obj, key) {
    return Object.assign(obj, {[key]: false})
  }

  return [
    isPopupOpen,
    openPopup,
    closeAllPopups,
  ]
}