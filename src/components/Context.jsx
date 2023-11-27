import { memo } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Context = memo(({children, currentUser,}) => {
  return(
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  )
})

export default Context