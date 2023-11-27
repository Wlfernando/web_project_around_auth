import { memo } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupOpenContext } from '../contexts/PopupOpenContext';

const Context = memo(({children, currentUser, isOpen,}) => {
  return(
    <CurrentUserContext.Provider value={currentUser}>
      <PopupOpenContext.Provider value={isOpen}>
        {children}
      </PopupOpenContext.Provider>
    </CurrentUserContext.Provider>
  )
})

export default Context