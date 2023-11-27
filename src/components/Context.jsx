import { memo } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupOpenContext } from '../contexts/PopupOpenContext';
import { CloseContext } from '../contexts/CloseContext';

const Context = memo(({
  children,
  currentUser,
  isOpen,
  onClose,
}) => {
  return(
    <CurrentUserContext.Provider value={currentUser}>
      <PopupOpenContext.Provider value={isOpen}>
        <CloseContext.Provider value={onClose}>
          {children}
        </CloseContext.Provider>
      </PopupOpenContext.Provider>
    </CurrentUserContext.Provider>
  )
})

export default Context