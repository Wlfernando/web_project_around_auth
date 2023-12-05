import { useState, useCallback } from "react";

export default function usePopupRender() {
  const
    [isPopupOpen, setPopupOpen] = useState({
      avatar: false,
      edit: false,
      add: false,
      image: false,
      remove: false,
      error: false,
    }),

    openPopup = useCallback(function (popup) {
      setPopupOpen((state) => ({...state, [popup]: true}))
    }, []),

    closeAllPopups = function () {
      setPopupOpen((state) => Object
        .keys(state)
        .reduce((obj, key) => ({...obj, [key]: false}), {})
      )
    }

  return {
    isPopupOpen,
    openPopup,
    closeAllPopups,
  }
}